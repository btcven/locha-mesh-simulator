const { spawn } = require('child_process');
const exec = 'ps';

const ps = spawn(exec, ['ax']);


ps.stdout.on('data', (data) => {

});

ps.stderr.on('data', (data) => {

});










