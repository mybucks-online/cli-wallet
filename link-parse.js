require("dotenv").config();
const { splitFromBase64 } = require("./lib/url");

async function main() {
  const token = process.argv[2];
  if (!token) {
    console.log("Please specify token as param!");
    return;
  }
  console.log("\nParsing ", token);

  const [password, passcode, network] = splitFromBase64(token);
  console.log("\npassword: ", password);
  console.log("passcode: ", passcode);
  console.log("network: ", network);
}

main().then(() => {
  console.log("\nfinished.");
  process.exit(0);
});
