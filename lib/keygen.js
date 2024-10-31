const { scrypt } = require("scrypt-js");
const { Buffer } = require("buffer");

const { HASH_OPTIONS, generateSalt } = require("./conf");

const generateHash = async (password, passcode, cb = (p) => {}) => {
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

module.exports = { generateHash };
