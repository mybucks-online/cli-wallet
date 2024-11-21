require("dotenv").config();
const { Network } = require("alchemy-sdk")

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
  },
  56: {
    chainId: 56,
    networkId: Network.BNB_MAINNET,
    name: "bsc",
    label: "BNB Chain",
    provider: "https://bsc-dataseed.binance.org/",
    scanner: "https://bscscan.com",
  },
  137: {
    chainId: 137,
    networkId: Network.MATIC_MAINNET,
    name: "polygon",
    label: "Polygon",
    provider:
      "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://polygonscan.com",
  },
  42161: {
    networkId: Network.ARB_MAINNET,
    chainId: 42161,
    name: "arbitrum",
    label: "Arbitrum",
    provider:
      "https://arbitrum-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://arbiscan.io",
  },
  43114: {
    chainId: 43114,
    networkId: Network.AVAX_MAINNET,
    name: "avalanche",
    label: "Avalanche C-Chain",
    provider:
      "https://avalanche-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://snowtrace.io",
  },
  10: {
    chainId: 10,
    networkId: Network.OPT_MAINNET,
    name: "optimism",
    label: "Optimism",
    provider:
      "https://optimism-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://optimistic.etherscan.io",
  },
  59144: {
    chainId: 59144,
    networkId: Network.LINEA_MAINNET,
    name: "linea",
    label: "Linea",
    provider:
      "https://linea-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://lineascan.build",
  },
  42220: {
    chainId: 42220,
    networkId: Network.CELO_MAINNET,
    name: "celo",
    label: "Celo",
    provider: "https://celo-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://celoscan.io",
  },
};

module.exports = {
  EVM_NETWORKS,
  HASH_OPTIONS,
  NETWORK,
};
