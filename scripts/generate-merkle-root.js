/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const fs = require('fs');
const csv = require('csv-parser');
const ethers = require('ethers');

// First 100 users (addresses + airdrop amounts)
const users = [
    // Tier 1: 1000 points (1-week pass)
    { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0b2e0", points: 1000, tier: "1week" },
    { address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", points: 1000, tier: "1week" },
    { address: "0xCdF4F9C6c6C4f5dE2d3E5a8b7C1a2b3c4d5e6f7a", points: 1000, tier: "1week" },
    // ... add more addresses here as needed
];

async function main() {
    // Generate leaves (hash of address + points)
    const leaves = users.map(user => 
        keccak256(
            ethers.solidityPacked(
                ['address', 'uint256'],
                [user.address, user.points]
            )
        )
    );

    // Create merkle tree
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = merkleTree.getRoot().toString('hex');
    const rootHash = `0x${root}`;

    console.log("📊 Merkle Tree Generated");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🌲 Root Hash: ${rootHash}`);
    console.log(`📝 Total Users: ${users.length}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    // Generate proofs for each user
    const proofs = users.map(user => {
        const leaf = keccak256(
            ethers.solidityPacked(
                ['address', 'uint256'],
                [user.address, user.points]
            )
        );
        const proof = merkleTree.getHexProof(leaf);
        
        return {
            address: user.address,
            points: user.points,
            tier: user.tier,
            proof: proof
        };
    });

    // Save to JSON file for backend
    fs.writeFileSync('./airdrop-data.json', JSON.stringify({
        rootHash: rootHash,
        totalUsers: users.length,
        proofs: proofs
    }, null, 2));

    console.log("✅ Airdrop data saved to airdrop-data.json");
    console.log("\n📋 Next steps:");
    console.log("1. Run: npx hardhat run scripts/set-merkle-root.js --network base");
    console.log("2. Share claim links with users");
}

main().catch(console.error);
