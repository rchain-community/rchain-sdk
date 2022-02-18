/* eslint-disable */
const fs = require('fs');
const path = require('path');

const console = require('console');

const execshell = require('../../utilities');

// clone rchain files from github
const cloneRchainCore = async () => {
const directory = path.join(__dirname, '../../contracts/rchain');
console.log(directory);

try {
    if (!fs.existsSync(directory)) {
        console.log('Cloning into rchain. This may take a while');
        await execshell(`git clone https://github.com/rchain/rchain.git`)
    } else {
        console.log('rchain already exists, updating....')
        await execshell(`cd ../../contracts/rchain && git pull`);
    }
} catch (err) {
            console.log(err)
            return;
}
}
cloneRchainCore();