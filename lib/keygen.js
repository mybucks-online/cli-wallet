const { scrypt } = require("scrypt-js");
const { Buffer } = require("buffer");
const { ethers } = require("ethers");

const { HASH_OPTIONS } = require("./conf");

const abi = new ethers.AbiCoder();

const generateSalt = (password, passcode) => `${password.slice(-4)}${passcode}`;

const generateHash = async (password, passcode, cb = (p) => { }) => {
  const salt = generateSalt(password, passcode);
  const passwordBuffer = Buffer.from(password);
  const saltBuffer = Buffer.from(salt);

  const hashBuffer = await scrypt(
    passwordBuffer,
    saltBuffer,
    HASH_OPTIONS.N,
    HASH_OPTIONS.r,
    HASH_OPTIONS.p,
    HASH_OPTIONS.keyLen,
    cb
  );

  return Buffer.from(hashBuffer).toString("hex");
};

const getEvmPrivateKey = (h) => ethers.keccak256(abi.encode(["string"], [h]));

module.exports = { generateHash, generateSalt, getEvmPrivateKey };
