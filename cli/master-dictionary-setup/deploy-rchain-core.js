/* eslint-disable */
const { join, resolve } = require('path');
const { readdir } = require('fs').promises;

const console = require('console');

const { deploy } = require('../../utilities');

const ALLNETWORKS = require('../../utilities');
const network = 'localhost';
const privatekey_f = join(__dirname, '../../utilities/private-keys/pk.bootstrap');

const deployRchainCore = async () => {
    const directory = join(__dirname, '../../contracts/rchain');
    // get rholang files from rchain directory function
    async function* getFiles(dir) {
        const dirents = await readdir(dir, { withFileTypes: true });
        for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
        }
    }
    function forAwait(asyncIter, f) {
        asyncIter.next().then(({ done, value }) => {
        if (done) return;
        f(value);
        forAwait(asyncIter, f);
        });
    }

     // deploy rchain core files
     console.log('deploying rchain core rholang files')

     forAwait(getFiles(directory), (x) => {
         if (x.endsWith('.rho') && !x.includes('test') && !x.includes('examples')) {
             deploy(console, ALLNETWORKS, x, privatekey_f, network);
         }
     });
}
deployRchainCore();
