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
    console.log("\n\nFetching balances of ", EVM_NETWORKS[chainId].label);
    const account = new EvmAccount(hash, chainId);

    console.log("Address: ", account.address);

    // fetch native currency history
    console.log(
      "\n\nFetching transfers history of native currency at ",
      EVM_NETWORKS[chainId].label
    );
    const history = await account.queryTransfersHistory();
    console.log(JSON.stringify(history, null, 2));
/*
    // fetch erc-20 history
    console.log(
      "\n\nFetching transfers history of erc-20 at ",
      EVM_NETWORKS[chainId].label
    );
    const history2 = await account.queryTransfersHistory(
      "0xdAC17F958D2ee523a2206206994597C13D831ec7"
    );
    console.log(JSON.stringify(history2, null, 2));
*/
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
