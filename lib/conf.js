require("dotenv").config();
const { ethers } = require("ethers");
const abi = new ethers.AbiCoder();

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

const generateSalt = (password, passcode) => `${password.slice(-4)}${passcode}`;

const getEvmPrivateKey = (h) => ethers.keccak256(abi.encode(["string"], [h]));

const EVM_NETWORKS = {
  1: {
    chainId: 1,
    name: "ethereum",
    label: "Ethereum",
    provider: "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://etherscan.io",
  },
  56: {
    chainId: 56,
    name: "bsc",
    label: "BNB Chain",
    provider: "https://bsc-dataseed.binance.org/",
    scanner: "https://bscscan.com",
  },
  137: {
    chainId: 137,
    name: "polygon",
    label: "Polygon",
    provider:
      "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://polygonscan.com",
  },
  42161: {
    chainId: 42161,
    name: "arbitrum",
    label: "Arbitrum",
    provider:
      "https://arbitrum-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://arbiscan.io",
  },
  43114: {
    chainId: 43114,
    name: "avalanche",
    label: "Avalanche C-Chain",
    provider:
      "https://avalanche-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://snowtrace.io",
  },
  10: {
    chainId: 10,
    name: "optimism",
    label: "Optimism",
    provider:
      "https://optimism-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://optimistic.etherscan.io",
  },
  59144: {
    chainId: 59144,
    name: "linea",
    label: "Linea",
    provider:
      "https://linea-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://lineascan.build",
  },
  42220: {
    chainId: 42220,
    name: "celo",
    label: "Celo",
    provider: "https://celo-mainnet.infura.io/v3/" + process.env.INFURA_API_KEY,
    scanner: "https://celoscan.io",
  },
};

const ERC20_DEFAULT_ASSETS = ["USDT", "USDC"];

module.exports = {
  ERC20_DEFAULT_ASSETS,
  EVM_NETWORKS,
  HASH_OPTIONS,
  NETWORK,
  generateSalt,
  getEvmPrivateKey,
};
