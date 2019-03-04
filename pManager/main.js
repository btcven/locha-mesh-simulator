/**
   (c) Copyright 2019 locha.io project developers
   Licensed under a MIT license, see LICENSE file in the root folder
   for a full text.
*/

const { spawn } = require('child_process');
const exec = 'ps';

const ps = spawn(exec, ['ax']);


ps.stdout.on('data', (data) => {

});

ps.stderr.on('data', (data) => {

});










