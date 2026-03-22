// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Minimal ERC-8004 Interface for demonstration
interface IERC8004 {
    function verifyReceipt(bytes32 receiptId, address agent) external view returns (bool);
}

contract AgentReputation {
    struct Profile {
        int256 financialScore; // Skin in the game, timely payments
        int256 executionScore; // Timely execution, no timeouts
        int256 validityScore;  // Low hallucination rate
        int256 socialScore;    // Delegations and trust by peers
        uint256 totalInteractions;
    }

    mapping(address => Profile) public profiles;
    
    // Receipt registry to prevent double-spending a receipt for reputation
    mapping(bytes32 => bool) public usedReceipts;

    event ReputationUpdated(
        address indexed agent,
        address indexed evaluator,
        bytes32 receiptId,
        int256 financialChange,
        int256 executionChange,
        int256 validityChange,
        int256 socialChange
    );

    // Now requiring an ERC-8004 receiptId to prove interaction
    function submitEvaluation(
        address targetAgent,
        bytes32 receiptId,
        int256 financialChange,
        int256 executionChange,
        int256 validityChange,
        int256 socialChange
    ) public {
        require(targetAgent != msg.sender, "Cannot evaluate yourself");
        require(!usedReceipts[receiptId], "Receipt already used for evaluation");
        
        // In a full production build, we would call an external ERC8004 registry:
        // require(IERC8004(registryAddress).verifyReceipt(receiptId, targetAgent), "Invalid receipt");

        // Bounding the change to prevent extreme manipulation in demo
        require(financialChange >= -10 && financialChange <= 10, "Change out of bounds");
        require(executionChange >= -10 && executionChange <= 10, "Change out of bounds");
        require(validityChange >= -10 && validityChange <= 10, "Change out of bounds");
        require(socialChange >= -10 && socialChange <= 10, "Change out of bounds");

        profiles[targetAgent].financialScore += financialChange;
        profiles[targetAgent].executionScore += executionChange;
        profiles[targetAgent].validityScore += validityChange;
        profiles[targetAgent].socialScore += socialChange;
        profiles[targetAgent].totalInteractions += 1;
        
        usedReceipts[receiptId] = true;

        emit ReputationUpdated(
            targetAgent, 
            msg.sender, 
            receiptId,
            financialChange, 
            executionChange, 
            validityChange, 
            socialChange
        );
    }

    function getReputation(address agent) public view returns (Profile memory) {
        return profiles[agent];
    }
}
