import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();
console.log(`You've generated a new Solana wallet: \n${kp.publicKey.toBase58()}`);
console.log(`Here is your secret key: \n${kp.secretKey}`);