const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
    const rpcUrl = "https://sepolia.base.org";
    const privateKey = process.env.PRIVATE_KEY;
    
    if (!privateKey) {
        console.error("No PRIVATE_KEY provided");
        process.exit(1);
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    console.log("Deploying from account:", wallet.address);

    const compiledData = JSON.parse(fs.readFileSync("AgentReputation.json", "utf8"));
    const abi = compiledData.abi;
    const bytecode = compiledData.bytecode;

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    
    console.log("Deploying contract...");
    const contract = await factory.deploy();
    
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    console.log("Contract deployed to:", address);
    
    // Send a test transaction to demonstrate it works
    console.log("Sending a test evaluation transaction...");
    
    // Fake receipt ID (bytes32)
    const testReceiptId = ethers.id("test-receipt-001");
    // We evaluate another random address just for demo
    const targetAgent = "0x1111222233334444555566667777888899990000";
    
    const tx = await contract.submitEvaluation(
        targetAgent,
        testReceiptId,
        5,   // financial
        10,  // execution
        8,   // validity
        3    // social
    );
    
    console.log("Waiting for test tx confirmation...");
    const receipt = await tx.wait();
    
    console.log("Transaction confirmed in block", receipt.blockNumber);
    console.log("Transaction Hash:", receipt.hash);
}

main().catch(console.error);
