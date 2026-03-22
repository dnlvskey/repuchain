const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'AgentReputation.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'AgentReputation.sol': {
            content: source,
        },
    },
    settings: {
        evmVersion: 'paris',
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode.object'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
    output.errors.forEach(err => {
        console.error(err.formattedMessage);
    });
} else {
    const contract = output.contracts['AgentReputation.sol']['AgentReputation'];
    fs.writeFileSync('AgentReputation.json', JSON.stringify({
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object
    }, null, 2));
    console.log("Compiled successfully!");
}
