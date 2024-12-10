# Mybucks.online CLI Wallet

This is CLI-mode crypto wallet that uses the same mechanism of [app.mybucks.online](https://app.mybucks.online).

## How to run

```
cp .env.example .env
// configure password, passcode, preferred chain ids
npm install

npm run balances
// this will enlist the account's assets in preferred chains.

npm run history
// this will enlist the transfer history of in/out native currency in preferred chains.

npm run link-generate
// this generates a transfer-wallet link

npm run link-parse [link-token]
// this will parse the token and show embedded params
```
