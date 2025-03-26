import { Transaction, SystemProgram, Connection, Keypair, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();
const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey(`${process.env.MY_TURBIN3_WALLET_ADDRESS}`);
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try {
        const balance = await connection.getBalance(from.publicKey);
        const tempTx = new Transaction().add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance,
        }));
        tempTx.recentBlockhash = (await (connection.getLatestBlockhash('confirmed'))).blockhash;
        tempTx.feePayer = from.publicKey;

        const fee = (await connection.getFeeForMessage(tempTx.compileMessage(), 'confirmed')).value || 0;
        tempTx.instructions.pop();
        tempTx.add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance - fee,
        }));
        
        const signature = await sendAndConfirmTransaction(connection, tempTx, [from]);
        console.log(`Success! TX: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();