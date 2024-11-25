require("dotenv").config();
const { Network } = require("alchemy-sdk");

const HASH_OPTIONS = {
  N: 1024 * 32, // CPU/memory cost parameter (must be a power of 2, > 1)
  r: 8, // block size parameter
  p: 5, // parallelization parameter
  keyLen: 64, // length of derived key
};

const NETWORK = Object.freeze({
  EVM: "evm",
  TRON: "tron",
});

const EVM_NETWORKS = {
  1: {
    chainId: 1,
    networkId: Network.ETH_MAINNET,
    name: "ethereum",
    label: "Ethereum",
    provider: "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://etherscan.io",
    wrappedAsset: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  56: {
    chainId: 56,
    networkId: Network.BNB_MAINNET,
    name: "bsc",
    label: "BNB Chain",
    provider: "https://bsc-dataseed.binance.org/",
    scanner: "https://bscscan.com",
    wrappedAsset: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  137: {
    chainId: 137,
    networkId: Network.MATIC_MAINNET,
    name: "polygon",
    label: "Polygon",
    provider:
      "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://polygonscan.com",
    wrappedAsset: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  },
  42161: {
    networkId: Network.ARB_MAINNET,
    chainId: 42161,
    name: "arbitrum",
    label: "Arbitrum",
    provider:
      "https://arbitrum-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://arbiscan.io",
    wrappedAsset: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  },
  43114: {
    chainId: 43114,
    networkId: Network.AVAX_MAINNET,
    name: "avalanche",
    label: "Avalanche C-Chain",
    provider:
      "https://avalanche-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://snowtrace.io",
    wrappedAsset: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  },
  10: {
    chainId: 10,
    networkId: Network.OPT_MAINNET,
    name: "optimism",
    label: "Optimism",
    provider:
      "https://optimism-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://optimistic.etherscan.io",
    wrappedAsset: "0x4200000000000000000000000000000000000006",
  },
};

module.exports = {
  EVM_NETWORKS,
  HASH_OPTIONS,
  NETWORK,
};
