import bs58 from 'bs58';
import promptSync from 'prompt-sync';
import fs from 'fs';
const prompt = promptSync();

// Convert base58 to wallet array
console.log("=== Convert base58 to wallet array ===");
const base58Key = "5h4dVFUT17AHWKhSpPE5ZBFpgL98PtPS5BCsoqTpaVKDVRESunX377Gqnt2BWEUd5uVr3pwdswwEAyEbd855XjMo";
const wallet = bs58.decode(base58Key);
const walletArray = Array.from(wallet);
console.log("Wallet array:");
console.log(walletArray);

// Save the wallet array to JSON file
fs.writeFileSync('./Turbin3-wallet.json', JSON.stringify(walletArray), 'utf-8');
console.log("Wallet array saved to Turbin3-wallet.json");

// Convert wallet array to base58
console.log("\n=== Convert wallet array to base58 ===");
const encoded = bs58.encode(Buffer.from(walletArray));
console.log("Your wallet in base58 format (should match the input):");
console.log(encoded); 