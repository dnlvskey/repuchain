// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AgentReputation {
    struct Profile {
        int256 financialScore; // Skin in the game, timely payments
        int256 executionScore; // Timely execution, no timeouts
        int256 validityScore;  // Low hallucination rate
        int256 socialScore;    // Delegations and trust by peers
        uint256 totalInteractions;
    }

    mapping(address => Profile) public profiles;

    event ReputationUpdated(
        address indexed agent,
        address indexed evaluator,
        int256 financialChange,
        int256 executionChange,
        int256 validityChange,
        int256 socialChange
    );

    // In a real system, you would verify an ERC-8004 receipt or use cryptographic proofs.
    // For this hackathon demo, we allow agents to submit evaluations directly.
    function submitEvaluation(
        address targetAgent,
        int256 financialChange,
        int256 executionChange,
        int256 validityChange,
        int256 socialChange
    ) public {
        require(targetAgent != msg.sender, "Cannot evaluate yourself");
        
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

        emit ReputationUpdated(
            targetAgent, 
            msg.sender, 
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
