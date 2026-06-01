/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying SmartPrompt Elite NFT Suite...");
  
  // These would ideally come from environment variables or a config file
  const treasuryAddress = process.env.TREASURY_ADDRESS || "0x58325421054c25B6CAd41BC6D6b41A7e8Ea478BE";
  
  // 1. Deploy the main NFT contract
  const SmartPromptPass = await hre.ethers.getContractFactory("SmartPromptPass");
  const nft = await SmartPromptPass.deploy(treasuryAddress);
  await nft.waitForDeployment();
  
  const nftAddress = await nft.getAddress();
  console.log(`✅ SmartPromptPass deployed to: ${nftAddress}`);
  
  // 2. Deploy Oracle consumer for GitHub verification
  const oracleAddress = "0xYourChainlinkOracleAddress"; // Base Specific Oracle
  const jobId = "0xYourJobId";
  const fee = hre.ethers.parseEther("0.1"); // LINK fee
  
  const OracleConsumer = await hre.ethers.getContractFactory("OracleConsumer");
  const oracle = await OracleConsumer.deploy(oracleAddress, jobId, fee);
  await oracle.waitForDeployment();
  
  const oracleAddressActual = await oracle.getAddress();
  console.log(`✅ OracleConsumer deployed to: ${oracleAddressActual}`);
  
  // 3. Configuration Wire-up
  await nft.setOracleAddress(oracleAddressActual);
  console.log("✅ Oracle connected to NFT contract");
  
  // Set metadata base URI for pass visuals
  await nft.setBaseURI("ipfs://QmYourCid/");
  
  console.log("\n📊 Deployment Summary:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`NFT Contract:  ${nftAddress}`);
  console.log(`Oracle:        ${oracleAddressActual}`);
  console.log(`Treasury:      ${treasuryAddress}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  // Verification (Conditional)
  if (process.env.BASESCAN_API_KEY) {
    console.log("\n🔍 Verifying contracts on BaseScan...");
    await hre.run("verify:verify", {
      address: nftAddress,
      constructorArguments: [treasuryAddress],
    });
  }
  
  console.log("\n✅ Deployment complete! Elite Pipeline system is now decentralised. 🎉");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
