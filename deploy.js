const { ethers } = require("ethers");
const fs = require('fs');

async function main() {
    // Generate a random wallet for the demo
    const wallet = ethers.Wallet.createRandom();
    console.log("Wallet address:", wallet.address);
    console.log("Wallet private key:", wallet.privateKey);
    // DO NOT USE THIS IN PROD! It's just for the hackathon testnet.

    const rpcUrl = "https://public.sepolia.rpc.status.network";
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const signer = wallet.connect(provider);

    const contractData = JSON.parse(fs.readFileSync('AgentReputation.json', 'utf8'));

    const factory = new ethers.ContractFactory(contractData.abi, contractData.bytecode, signer);

    console.log("Deploying contract with gasPrice=0...");
    try {
        const contract = await factory.deploy({ gasPrice: 0 });
        await contract.waitForDeployment();
        console.log("Contract deployed to:", await contract.getAddress());
        console.log("Deployment Tx Hash:", contract.deploymentTransaction().hash);

        // Now do a gasless transaction
        console.log("Sending gasless transaction...");
        const targetAgent = ethers.Wallet.createRandom().address;
        
        const tx = await contract.submitEvaluation(targetAgent, 5, 2, -1, 3, { gasPrice: 0 });
        await tx.wait();
        
        console.log("Evaluation transaction Hash:", tx.hash);
        
        const rep = await contract.getReputation(targetAgent);
        console.log("Updated Reputation:", {
            financial: rep.financialScore.toString(),
            execution: rep.executionScore.toString(),
            validity: rep.validityScore.toString(),
            social: rep.socialScore.toString()
        });

    } catch (e) {
        console.error("Error:", e);
    }
}

main();