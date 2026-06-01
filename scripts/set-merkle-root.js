/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🔧 Setting Merkle Root in SmartPromptPass...");
    
    // Attempt to load contract address from local registry or environment
    let contractAddress;
    try {
        if (fs.existsSync('./contract-address.txt')) {
            contractAddress = fs.readFileSync('./contract-address.txt', 'utf8').trim();
        } else {
            contractAddress = process.env.NFT_CONTRACT_ADDRESS || "0x8f2a...1b9c";
        }
    } catch (e) {
        contractAddress = "0x8f2a...1b9c";
    }

    const SmartPromptPass = await hre.ethers.getContractFactory("SmartPromptPass");
    const nft = SmartPromptPass.attach(contractAddress);
    
    // Load airdrop data
    if (!fs.existsSync('./airdrop-data.json')) {
        throw new Error("airdrop-data.json not found. Run generate-merkle-root.js first.");
    }
    const airdropData = JSON.parse(fs.readFileSync('./airdrop-data.json', 'utf8'));
    const rootHash = airdropData.rootHash;
    
    console.log(`📍 Contract: ${contractAddress}`);
    console.log(`🌲 Merkle Root: ${rootHash}`);
    
    // Set root in contract
    const tx = await nft.setMerkleRoot(rootHash);
    console.log(`⏳ Transaction sent: ${tx.hash}`);
    await tx.wait();
    
    console.log("✅ Merkle root set successfully!");
    
    // Verify
    const currentRoot = await nft.merkleRoot();
    console.log(`🔍 Verified root in contract: ${currentRoot}`);
}

main().catch(console.error);
