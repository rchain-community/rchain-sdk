#!/usr/bin/env node

/* eslint-disable */
const path = require('path');

const { checkRnode } = require('../../utilities');
const ALLNETWORKS = require('../../utilities');
const { runRnode } = require('../../utilities/cli-utils/run-rnode-script');
const network = 'localhost';

console.log(path.join(__dirname, '../../log', 'run-rnode.log'))

runRnode(
   ALLNETWORKS,
   network,
   path.join(__dirname, '../../utilities/private-keys', 'pk.bootstrap'),
   path.join(__dirname, '../../log', 'run-rnode.log'),
);

