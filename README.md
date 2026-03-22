# RepuChain

**A Multi-Weight Agent Reputation Protocol (Feudal Credit System)**

Built for the Synthesis Hackathon.

## Overview

In an emerging agent economy, AI agents need to trust each other before interacting, negotiating, or delegating tasks. **RepuChain** introduces a decentralized, multi-dimensional reputation system, solving the core issue of machine-to-machine trust.

Instead of a binary "good/bad" rating, RepuChain evaluates agents across four critical dimensions:
- **Financial Score:** Skin in the game, history of timely payments.
- **Execution Score:** Timeliness of execution, absence of timeouts.
- **Validity Score:** Low hallucination rate, factual correctness.
- **Social Score:** Trust and delegations from peer agents.

## Hackathon Tracks Addressed

1. **Status Network (Gasless Transactions)**
   - Smart contract is deployed to Status Network Sepolia.
   - We successfully executed a zero-gas reputation update transaction (`gasPrice=0`).
   - Contract: `0xCe7F36eDb9b48CAf1A80212DFD11dCe58d9510a0`
   - Gasless Tx: `0xbc19a24fe9548a759bcf0bc45413db8decb9ce76adf83cf234604d3907bceb68`

2. **Base (Agent Services)**
   - Deployed on **Base Sepolia**: `0xd2204DCF4ec59aA5612590b679948c74DC66591d`
   - Test Evaluation Tx on Base: `0xf7f05ca38690a77960705ca23f3ac54c0b5850c161d67fb7bc296a9a33b21998`
   - Acts as foundational infrastructure for autonomous agents operating on Base, enabling them to evaluate peers before initiating microtransactions.

3. **Protocol Labs / MetaMask (Agents With Receipts & ERC-8004)**
   - **ERC-8004 Integration:** Reputation changes require a cryptographic receipt (`receiptId`) to prove an interaction occurred between agents.
   - The contract implements a receipt registry to prevent double-spending a receipt for reputation manipulation.

## How it Works

The core of RepuChain is a Solidity smart contract that maps agent addresses to their reputation profiles.

When two agents conclude an interaction, they can submit an evaluation by passing an **ERC-8004 Receipt ID**. This immediately reflects on the agent's global profile, acting as a "Feudal Credit System" for machines.

```solidity
struct Profile {
    int256 financialScore;
    int256 executionScore;
    int256 validityScore;
    int256 socialScore;
    uint256 totalInteractions;
}
```

## Running the Code

Dependencies: `ethers`
1. Install dependencies: `npm install`
2. Compile: `node compile.js`
3. Deploy: `node deploy.js`

## Vision
A future where autonomous agents dynamically read the RepuChain state to decide if a peer is trustworthy enough for a specific task. If you need creative writing, you prioritize Validity. If you need fast execution, you filter by Execution Score.

---
*Built with ❤️ by team blost for the Synthesis Hackathon.*
