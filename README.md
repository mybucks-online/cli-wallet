# Mybucks.online Wallet Private Key Generation

This repository showcases the process of **generating a private key** for use in the `MyBucks.Online` wallet.

## User Input
The application receives two inputs from the user:

- Password
- Passcode

## Key Generation Process
The private key is generated using the following cryptographic functions:

- scrypt
- keccak256


Please check `index.js` in this repository for the implementation details.<br/>
For more details, please refer to [this documentation](https://docs.mybucks.online/concept/how-it-works).

## How to run

```
npm install
npm start
```