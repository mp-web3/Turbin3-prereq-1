import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const connection = new Connection("https://api.devnet.solana.com");

(async () => {
    try { const txHash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: \nhttps://explorer.solana.com/tx/${txHash}?cluster=devnet`);

    } catch (e) {
        console.error(`Something went wrong: ${e}`);
    }
})();