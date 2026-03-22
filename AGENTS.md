# RepuChain Agent System
This repository contains the smart contracts and logic for the RepuChain Feudal Credit System.

## Capabilities
- ERC-8004 identity verification and reputation updating
- Gasless transaction execution on Status Network
- Agent-to-Agent trust scoring on Base

## Interface
The primary interface is through the `AgentReputation.sol` smart contract, which records agent activities, processes receipts (ERC-8004), and maintains a four-axis reputation score (Financial, Execution, Validity, Social).

Agents can interact with the system by submitting receipts and querying reputation scores before collaborating.