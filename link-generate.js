require("dotenv").config();
const { mergeToBase64 } = require("./lib/url");

async function main() {
  const token = mergeToBase64(
    process.env.PASSWORD,
    process.env.PASSCODE,
    "polygon"
  );
  console.log("token: ", token);
}

main().then(() => {
  console.log("\nfinished.");
  process.exit(0);
});
