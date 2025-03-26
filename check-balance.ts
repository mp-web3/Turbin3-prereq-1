import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const balance = await connection.getBalance(keypair.publicKey);
        console.log(`Wallet: ${keypair.publicKey.toBase58()}`);
        console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (e) {
        console.error(`Error: ${e}`);
    }
})(); 