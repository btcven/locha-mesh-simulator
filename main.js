'use strict';
const node = require('child_process');
const api = node.fork(`${__dirname}/wServer/main.js`);
const pms = node.fork(`${__dirname}/pManager/main.js`);

var ioHandler = function (data) {
    console.log(data);
};

var wsHandler = function (data) {
    console.log(data);
};

/* web-server process event handler */
api.on('close', (code, signal) => {
    console.log(api.pid, 'web_server - close', code, signal);
});
api.on('disconnect', (code, signal) => {
    console.log(api.pid, 'web_server - disconnect', code, signal);
});
api.on('error', (error) => {
    console.log(api.pid, 'web_server - error', error);
});
api.on('exit', (code, signal) => {
    console.log(api.pid, 'web_server - exit', code, signal);
});
api.on('message', (msg) => {
    switch (msg.type) {
        case 'socket_io':
            ioHandler(msg);
            break;
        case 'web_server':
            wsHandler(msg);
            break;
        default:
            console.warn('Unknow messge type: %s', msg.type);
            break;
    }
});

pms.on('message', (msg) => {
    console.warn(msg);
})