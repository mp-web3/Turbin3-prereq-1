import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the secret key from environment variable
const secretKeyString = process.env.SOLANA_WALLET1_SECRET;

if (!secretKeyString) {
    console.error('Secret key not found in environment variables');
    process.exit(1);
}

// Convert the comma-separated string to an array of numbers
const secretKeyArray = secretKeyString.split(',').map(num => parseInt(num.trim(), 10));

// Write to dev-wallet.json
fs.writeFileSync('dev-wallet.json', JSON.stringify(secretKeyArray));

console.log('Secret key successfully written to dev-wallet.json'); 