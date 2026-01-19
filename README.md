
<h1 align="center">🔗 KarsaChain</h1>

<p align="center">
  <i>The Eternal Vault. Store your digital legacy on the Blockchain.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/Thirdweb-SDK-purple?logo=thirdweb" />
  <img src="https://img.shields.io/badge/Solidity-Smart_Contract-363636?logo=solidity" />
  <img src="https://img.shields.io/badge/IPFS-Decentralized-65C2CB?logo=ipfs" />
  <img src="https://img.shields.io/badge/Network-Sepolia_Testnet-FFA500" />
</p>

---

## 🛡️ About

**KarsaChain** is a Web3 decentralized application (dApp) designed to preserve digital assets—images, documents, and blueprints—permanently.

Unlike traditional cloud storage, KarsaChain utilizes **Blockchain technology** to ensure your data is:

- 🔒 **Immutable** (Cannot be altered or deleted)
- 🌍 **Censorship-Resistant** (No central authority control)
- 💎 **Transparent** (Verifiable on the Sepolia Network)

Every upload is secured via **IPFS** for storage and anchored on **Ethereum (Sepolia)** for proof of ownership.

---

## ✨ Features

| Feature | Description |
|------|------------|
| 💼 **Wallet Connection** | Seamless login via MetaMask/Thirdweb |
| ⛓️ **On-Chain Storage** | Smart Contract records ownership & metadata |
| 📡 **IPFS Integration** | Decentralized file hosting (Zero downtime) |
| 🌐 **Public Vaults** | Dynamic profiles (`/[address]`) to showcase assets |
| 🌍 **Multi-language** | Native support for English & Indonesian (ID/EN) |

---

## 🛠️ Tech Stack

```ts
const stack = {
  framework: "Next.js 16 (App Router)",
  blockchain: "Solidity (Ethereum Sepolia)",
  web3_sdk: "Thirdweb SDK",
  storage: "IPFS (InterPlanetary File System)",
  styling: "Tailwind CSS v4",
  state: "Zustand",
  deployment: "Vercel",
};

```

---

## 📦 Project Structure

```txt
karsachain
 ┣ 📂 app
 ┃ ┣ 📂 [address]        # Dynamic Public Vault Profile
 ┃ ┣ 📂 dashboard        # Private User Workspace (Upload)
 ┃ ┣ 📜 layout.tsx       # Root layout & Thirdweb Provider
 ┃ ┗ 📜 page.tsx         # Landing Page
 ┣ 📂 components
 ┃ ┣ 📜 Gallery.tsx      # Fetches & displays user assets
 ┃ ┣ 📜 Navbar.tsx       # Navigation & Wallet Connect
 ┃ ┗ 📜 UploadForm.tsx   # Asset Minting Logic
 ┣ 📂 lib
 ┃ ┣ 📜 translations.ts  # i18n Dictionary (ID/EN)
 ┃ ┗ 📜 store.ts         # Global State Management
 ┗ 📜 contract.sol       # Solidity Smart Contract

```

---

## ⛓️ Architecture

<sub>How data travels from your device to eternity</sub>

```mermaid
graph TD
  User[User] -->|Connect Wallet| DApp[KarsaChain Web]
  DApp -->|Upload File| IPFS[IPFS Storage]
  IPFS -->|Return Hash (CID)| DApp
  DApp -->|Mint Transaction| Contract[Smart Contract on Sepolia]
  Contract -->|Verify Block| Blockchain[Ethereum Network]
  Blockchain -->|Permanent Record| PublicVault[Public Profile]

```

* 🔑 **Authentication**: handled by Thirdweb.
* 📦 **Storage**: Heavy data (images/docs) goes to IPFS.
* 📝 **Ledger**: Only the *hash* and *metadata* are stored on-chain to optimize gas costs.

---

## 🧪 Deployment

This project is deployed using **Vercel** with automatic CI/CD pipelines.

1. **Smart Contract**: Deployed on Sepolia Testnet via Thirdweb.
2. **Frontend**: Next.js App Router deployed on Vercel Edge Network.
3. **Environment**: Client ID secured via Allowed Domains.

---

<p align="center">
<sub>Built for the future. Preserved for history.</sub>
</p>

```

```
