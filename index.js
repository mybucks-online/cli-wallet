const { scrypt } = require("scrypt-js");
const { Buffer } = require("buffer");
const { ethers } = require("ethers");

const HASH_OPTIONS = {
  N: 1024 * 32, // CPU/memory cost parameter (must be a power of 2, > 1)
  r: 8, // block size parameter
  p: 5, // parallelization parameter
  keyLen: 64, // length of derived key
};
const abi = new ethers.AbiCoder();

async function main() {
  const password = "examplePassword34%";
  const passcode = "23a61w";

  const salt = `${password.slice(-4)}${passcode}`;

  const passwordBuffer = Buffer.from(password);
  const saltBuffer = Buffer.from(salt);

  const start = performance.now();
  const hashBuffer = await scrypt(
    passwordBuffer,
    saltBuffer,
    HASH_OPTIONS.N,
    HASH_OPTIONS.r,
    HASH_OPTIONS.p,
    HASH_OPTIONS.keyLen,
    (p) => console.log(Math.floor(p * 100))
  );
  const hashHex = Buffer.from(hashBuffer).toString("hex");
  const privateKey = ethers.keccak256(abi.encode(["string"], [hashHex]));
  const end = performance.now();

  console.log("Calculation Time: ", (end - start) / 1000);
  console.log("Hash: ", hashHex);
  console.log("Private Key: ", privateKey);
}

main()
  .then(() => {
    process.exit();
  })
  .catch(() => {
    console.error("Failed to execute.");
  });
