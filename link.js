const { nanoid } = require("nanoid");

function mergeToBase64(password, passcode, network) {
  const merged = Buffer.from(
    password + "\u0002" + passcode + "\u0002" + network,
    "utf-8"
  );
  const base64Encoded = merged.toString("base64");
  const padding = nanoid(12);
  return padding.slice(0, 6) + base64Encoded + padding.slice(6);
}

function splitFromBase64(token) {
  const payload = token.slice(6, token.length - 6);
  const base64Decoded = Buffer.from(payload, "base64").toString("utf-8");
  const [password, passcode, network] = base64Decoded.split("\u0002");
  return [password, passcode, network];
}

async function main() {
  const token = mergeToBase64("DemoAccount5&", "112324", "polygon");
  console.log("token: ", token);

  const [password, passcode, network] = splitFromBase64(token);
  console.log(password, passcode, network);
}

main().then(() => {
  console.log("\nfinished.");
  process.exit(0);
});
