require("dotenv").config();
const { nanoid } = require("nanoid");
const { mergeToBase64 } = require("./lib/url");
const { generateHash } = require("./lib/keygen");
const EvmAccount = require("./lib/evm");

async function main() {
  const timestamp = `${parseInt(Date.now() / 1000)}`;
  console.log("Generate random credentials at ", timestamp);

  const password = nanoid(14) + "%";
  const passcode = timestamp.slice(-6);
  console.log("password: ", password);
  console.log("passcode: ", passcode);

  const token = mergeToBase64(password, passcode, "polygon");
  console.log("token: ", token);

  const hash = await generateHash(password, passcode);
  const account = new EvmAccount(hash, 137);

  console.log("\n\naddress: ", account.address);
}

main().then(() => {
  console.log("\nfinished.");
  process.exit(0);
});
