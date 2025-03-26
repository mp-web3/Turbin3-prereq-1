import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey(`${process.env.MY_TURBIN3_WALLET_ADDRESS}`);
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const transaction = new Transaction().add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL / 10,
        }));
        transaction.recentBlockhash = (await (connection.getLatestBlockhash('confirmed'))).blockhash;
        transaction.feePayer = from.publicKey;
        const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
        console.log(`Success! TX: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();