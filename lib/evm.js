const { ethers } = require("ethers");
const { tokens } = require("@sushiswap/default-token-list");

const {
  ERC20_DEFAULT_ASSETS,
  NETWORK,
  EVM_NETWORKS,
  getEvmPrivateKey,
} = require("./conf");
const IERC20 = require("./erc20.json");

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

  constructor(hashKey, chainId) {
    this.chainId = chainId;
    this.provider = new ethers.JsonRpcProvider(EVM_NETWORKS[chainId].provider);

    this.signer = getEvmPrivateKey(hashKey);
    this.account = new ethers.Wallet(this.signer, this.provider);
    this.address = this.account.address;
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
    const balances = {};
    const nativeBalance = ethers.formatEther(
      await this.provider.getBalance(this.address)
    );
    balances["ETH"] = nativeBalance;

    for (const symbol of ERC20_DEFAULT_ASSETS) {
      const token = tokens.find(
        (token) => token.chainId === this.chainId && token.symbol === symbol
      );
      if (!token) {
        continue;
      }

      const erc20 = new ethers.Contract(
        token.address,
        IERC20.abi,
        this.provider
      );
      const balance = ethers.formatUnits(
        await erc20.balanceOf(this.address),
        token.decimals
      );
      if (parseFloat(balance) > 0) {
        balances[symbol] = balance;
      }
    }

    return balances;
  }
}

module.exports = Account;
