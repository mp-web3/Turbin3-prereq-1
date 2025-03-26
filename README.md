# Q2 2025 Solana Prereq

## Prerequisites: Enrollment dApp  
**READ CAREFULLY ALL STEPS**

> _NOTE: If you are a Windows user, you will want to work in WSL2 for Solana._  
> You have 24 hours to complete this.

These prerequisites are meant to assess your ability to follow processes, execute tasks, debug simple errors (intentionally placed), and ship code. They are **not a test of your TypeScript or coding skills**. It is integral that you **understand** what is happening every step of the way.

If you’re stuck, ask in the **Solana Chat channel on Discord**.

---

## Overview

You will:
- Learn how to use `@solana/web3.js` to create a new keypair  
- Airdrop yourself some devnet SOL  
- Make SOL transfers on devnet  
- Empty your devnet wallet into your Turbin3 wallet  
- Use your Turbin3 Private Key to enroll in the Turbin3 enrollment dApp

---

## Prerequisites
- Node.js installed  
- `yarn` installed  
- A fresh folder created for this and future tutorials

---

## Step 1: Create a New Keypair

### 1.1 Setup

```bash
mkdir airdrop && cd airdrop
yarn init -y
yarn add @types/node typescript @solana/web3.js bs58
yarn add -D ts-node
touch keygen.ts airdrop.ts transfer.ts enroll.ts
yarn tsc --init --rootDir ./ --outDir ./dist --esModuleInterop --lib ES2019 --module commonjs --resolveJsonModule true --noImplicitAny true
```

Update `package.json` scripts:

```json
{
  "scripts": {
    "keygen": "ts-node ./keygen.ts",
    "airdrop": "ts-node ./airdrop.ts",
    "transfer": "ts-node ./transfer.ts",
    "enroll": "ts-node ./enroll.ts"
  }
}
```

---

### 1.2 Generating a Keypair

In `keygen.ts`:

```ts
import { Keypair } from "@solana/web3.js";

let kp = Keypair.generate();
console.log(`You've generated a new Solana wallet:\n${kp.publicKey.toBase58()}`);
console.log(`[${kp.secretKey}]`);
```

Run:

```bash
yarn keygen
```

Create a file to store the key:

```bash
touch dev-wallet.json
```

Paste your secret key JSON array into `dev-wallet.json`.

---

### 1.3 Import/Export to Phantom

Install conversion tools:

```bash
yarn add bs58 prompt-sync
```

```ts
import bs58 from 'bs58';
import * as prompt from 'prompt-sync';

// Convert base58 to wallet
const base58 = prompt()("Enter your base58 private key: ");
const wallet = bs58.decode(base58);
console.log(wallet);

// Convert wallet to base58
const walletArray = [ /* your secret key array */ ];
const encoded = bs58.encode(Buffer.from(walletArray));
console.log(encoded);
```

---

## Step 2: Claim Token Airdrop

In `airdrop.ts`:

```ts
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
```

---

## Step 3: Transfer Tokens to Your Turbin3 Address

In `transfer.ts`:

```ts
import {
  Transaction, SystemProgram, Connection, Keypair,
  LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));
const to = new PublicKey("GLtaTaYiTQrgz411iPJD79rsoee59HhEy18rtRdrhEUJ");
const connection = new Connection("https://api.devnet.solana.com");

(async () => {
  try {
    const transaction = new Transaction().add(SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: LAMPORTS_PER_SOL / 100,
    }));
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;
    const signature = await sendAndConfirmTransaction(connection, transaction, [from]);
    console.log(`Success! TX: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
```

---

## Step 4: Empty devnet Wallet into Turbin3

In `transfer.ts` (extended):

```ts
(async () => {
  try {
    const balance = await connection.getBalance(from.publicKey);

    const tempTx = new Transaction().add(SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: balance,
    }));
    tempTx.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
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
```

---

## Step 5: Submit Turbin3 Enrollment

### 5.1 Consume IDL in Typescript

Create a folder for IDLs:

```bash
mkdir programs
touch ./programs/Turbin3_prereq.ts
```

Add your IDL content to the file and export it:

```ts
export type Turbin3Prereq = { ... }
export const IDL: Turbin3Prereq = { ... }
```

Install Anchor:

```bash
yarn add @coral-xyz/anchor
```

In `enroll.ts`:

```ts
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import wallet from "./Turbin3-wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const github = Buffer.from("<your github account>", "utf8");

const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);
```

### 5.2 Create a PDA

```ts
const enrollment_seeds = [Buffer.from("pre"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);
```

### 5.3 Submit Your Enrollment

```ts
(async () => {
  try {
    const txhash = await program.methods
      .submit(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();

    console.log(`Success! TX: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
```

---

## ✅ Congrats!

You've completed the **Turbin3 Solana Pre-requisite Coursework**!  
You’re now ready for the **Rust Registration Process**, which will be sent out after the 24-hour window to those who completed this task successfully.