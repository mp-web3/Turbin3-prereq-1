import bs58 from 'bs58';
import promptSync from 'prompt-sync';
import fs from 'fs';

const prompt = promptSync();

// For the second part, read wallet from dev-wallet.json
const walletArray = JSON.parse(fs.readFileSync('./dev-wallet.json', 'utf-8'));

// Convert base58 to wallet array
console.log("=== Convert base58 to wallet array ===");
const base58Key = prompt("Enter your base58 private key (or press Enter to skip): ");
if (base58Key) {
    const wallet = bs58.decode(base58Key);
    console.log("Wallet array:");
    console.log(Array.from(wallet));
}

// Convert wallet array to base58
console.log("\n=== Convert wallet array to base58 ===");
const encoded = bs58.encode(Buffer.from(walletArray));
console.log("Your wallet in base58 format:");
console.log(encoded); 