require("dotenv").config();
const { ethers } = require("ethers");
const { tokens: defaultTokensList } = require("@sushiswap/default-token-list");
const { Alchemy } = require("alchemy-sdk");

const { NETWORK, EVM_NETWORKS } = require("./conf");
const { getEvmPrivateKey } = require("./keygen");

const apiKey = process.env.ALCHEMY_API_KEY;

class Account {
  network = NETWORK.EVM;
  chainId = null;

  signer = null;
  account = null;
  provider = null;

  address = null;

  // evm account is activated as default
  activated = true;

  // wei unit
  gasPrice = 0;

  alchemy = null;

  constructor(hashKey, chainId) {
    this.chainId = chainId;
    this.provider = new ethers.JsonRpcProvider(EVM_NETWORKS[chainId].provider);

    this.signer = getEvmPrivateKey(hashKey);
    this.account = new ethers.Wallet(this.signer, this.provider);
    this.address = this.account.address;

    this.alchemy = new Alchemy({
      network: EVM_NETWORKS[chainId].networkId,
      apiKey,
    });
  }

  isAddress(value) {
    return ethers.isAddress(value);
  }

  linkOfAddress(address) {
    return EVM_NETWORKS[this.chainId].scanner + "/address/" + address;
  }

  linkOfContract(address) {
    return EVM_NETWORKS[this.chainId].scanner + "/address/" + address + "#code";
  }

  linkOfTransaction(txn) {
    return EVM_NETWORKS[this.chainId].scanner + "/tx/" + txn;
  }

  async getNetworkStatus() {
    const { gasPrice } = await this.provider.getFeeData();
    this.gasPrice = gasPrice;
  }

  async queryBalances() {
    /*
    const balances = {};
    const nativeBalance = ethers.formatEther(
      await this.provider.getBalance(this.address)
    );
    balances["ETH"] = nativeBalance;
    */

    // get balances
    const { tokenBalances } = await this.alchemy.core.getTokenBalances(
      this.address
    );

    // get prices
    const response = await fetch(
      `https://api.g.alchemy.com/prices/v1/${apiKey}/tokens/by-address`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          addresses: tokenBalances.map(({ contractAddress: address }) => ({
            network: EVM_NETWORKS[this.chainId].networkId,
            address,
          })),
        }),
      }
    );
    const { data: rawPrices } = await response.json();
    // converts key:value pair of address and latest price
    const prices = rawPrices
      .filter((t) => !t.error)
      .reduce(
        (acc, t) => ({ ...acc, [t.address.toLowerCase()]: t.prices[0].value }),
        {}
      );

    // find token details including name, symbol, decimals
    // and filter out not-listed tokens
    const balances = tokenBalances
      .map(({ contractAddress, tokenBalance }) => ({
        ...defaultTokensList.find(
          ({ address }) =>
            address.toLowerCase() === contractAddress.toLowerCase()
        ),
        rawBalance: tokenBalance,
      }))
      .filter((t) => !!t.address)
      .map((t) => ({
        ...t,
        balance: parseFloat(ethers.formatUnits(t.rawBalance, t.decimals)),
        price: parseFloat(prices[t.address.toLowerCase()]),
      }))
      .filter((t) => t.balance > 0);

    return balances;
  }
}

module.exports = Account;
