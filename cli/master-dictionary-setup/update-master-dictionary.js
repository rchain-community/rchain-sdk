/* eslint-disable */
const fs = require('fs');
const { join, resolve } = require('path');
const { readdir } = require('fs').promises;
const http = require("http");

const console = require('console');

const { deploy } = require('../../utilities');
const { easyDeploy } = require('../../utilities');

const ALLNETWORKS = require('../../utilities');
const network = 'localhost';
const privatekey_f = join(__dirname, '../../utilities/private-keys/pk.bootstrap');

const deployMasterDictionary = async () => {
    // get directory URI from output
    const directory = join(__dirname, '../../generated');
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

    // updating master dictionary
     console.log('updating master dictionary')

     forAwait(getFiles(directory), (x) => {
         if (x.endsWith('.rho') && !x.includes('create-master-dictionary')) {
             easyDeploy(console, ALLNETWORKS, x, privatekey_f, network);
         }
     });

}
deployMasterDictionary();
