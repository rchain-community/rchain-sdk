/* eslint-disable */
const fs = require('fs');
const path = require('path');

const console = require('console');

const { easyDeploy } = require('../../utilities');
const { propose } = require('../../utilities');
const { deployMasterDictionary } = require('../../utilities');

const ALLNETWORKS = require('../../utilities');
const network = 'localhost';
const privatekey_f = path.join(__dirname, '../../utilities/private-keys/pk.bootstrap');

const createDirectoryContract = async () => {
  // get directory URI
  const directoryURI = await easyDeploy(console, ALLNETWORKS, '../rholang/core/Directory.rho', privatekey_f, network);
  console.log(directoryURI);

    // deploy master dictionary
  masterURI = await deployMasterDictionary(directoryURI[2]);
  console.log(masterURI)
  
    // create uri-src directory if it does not exist
   const dir = path.join(__dirname, '../uri-src')
   if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true});
    }

    // write the master read uri to the MasterURI localhost file
     fs.writeFileSync(path.join(__dirname, "../uri-src/MasterURI.localhost.json"), JSON.stringify({ "localhostNETWORK": masterURI}))
}

createDirectoryContract()
