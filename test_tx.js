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

    const compiledData = JSON.parse(fs.readFileSync("AgentReputation.json", "utf8"));
    const abi = compiledData.abi;
    
    const contractAddress = "0xd2204DCF4ec59aA5612590b679948c74DC66591d";
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    
    console.log("Sending a test evaluation transaction...");
    
    // Fake receipt ID (bytes32)
    const testReceiptId = ethers.id("test-receipt-001");
    const targetAgent = "0x1111222233334444555566667777888899990000";
    
    // increase max priority fee to replace tx if pending
    const feeData = await provider.getFeeData();
    
    const tx = await contract.submitEvaluation(
        targetAgent,
        testReceiptId,
        5,   // financial
        10,  // execution
        8,   // validity
        3,   // social
        {
            maxFeePerGas: feeData.maxFeePerGas ? feeData.maxFeePerGas * 2n : undefined,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? feeData.maxPriorityFeePerGas * 2n : undefined
        }
    );
    
    console.log("Waiting for test tx confirmation...");
    const receipt = await tx.wait();
    
    console.log("Transaction confirmed in block", receipt.blockNumber);
    console.log("Transaction Hash:", receipt.hash);
}

main().catch(console.error);
