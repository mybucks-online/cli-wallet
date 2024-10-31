require("dotenv").config();

const { EVM_NETWORKS } = require("./lib/conf");
const { generateHash } = require("./lib/keygen");
const EvmAccount = require("./lib/evm");

async function main() {
  console.log("Generating key ...");
  const hash = await generateHash(process.env.PASSWORD, process.env.PASSCODE);

  const preferredChains = process.env.CHAINS_ID.split(",").map((t) =>
    parseInt(t)
  );
  for (const chainId of preferredChains) {
    console.log("\nFetching balances of ", EVM_NETWORKS[chainId].label);
    const account = new EvmAccount(hash, chainId);

    console.log("Address: ", account.address);

    const balances = await account.queryBalances();
    Object.entries(balances).forEach(([symbol, balance]) => {
      console.log(symbol, balance);
    });
  }
}

main()
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.error("Failed to execute.");
    console.log(e);
  });
