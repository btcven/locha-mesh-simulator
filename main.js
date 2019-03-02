'use strict';
const node = require('child_process');
const api = node.fork(`${__dirname}/wServer/main.js`);

const pms = node.fork(`${__dirname}/pManager/main.js`);

/**
 * define a new peerList and execute operations in each element
 */

class peerList {
    constructor(data) {
        // data.list: [{id: 0, options: {}}, {id: 1, options: {}}]
        this.peer_list = data.list;
    }
    init() {
        // TODO execute [this.peer_list] list of nodes.
        // ;; this func. can be auto initialized when the list is created. 
    }
    update(n) {
        // TODO execute the (n) list of nodes.
        // TODO update characteristics of the (n) list of nodes.
        // each node in the list must be equal an a valid node.
    }
    delete(n) {
        // TODO delete the (n) list of nodes.
    }
    purge() {
        // TODO stop and delete every peer in [this.peer_list]  
    }

}

var ioHandler = function (msg) {
    switch (msg.event) {
        case 'nodes_list':
            // data.cmd : is a command to exec.
            //  for ex: put, update, delete. 
            // data.list: is a JSON containing definitions of each node to create, update or delete.
            //
            console.log('nodes: ', msg.data);
            break;
        case 'connection':
            console.log('client connected:', msg.data);
            // next: waiting for commands
            break;
        case 'disconnect':
            console.log('client disconnect:', msg.data);
            // next: verify if each subprocess created was stopped.
            break;
        default:
            break;
    }
};

var wsHandler = function (msg) {
    switch (msg.event) {
        case 'listen':
            console.log('open: http://localhost:%s', msg.data.port);
            break;
        default:
            break;
    }
};

/* web-server process event handler */

api.on('close', (code, signal) => {
    // TODO 
    // - verify if a list is created, if yes: stop and delete each process.
    console.log(api.pid, 'web_server - close', code, signal);
});
api.on('disconnect', (code, signal) => {
    // TODO 
    // - verify if a list is created, if yes: stop and delete each process.
    console.log(api.pid, 'web_server - disconnect', code, signal);
});
api.on('error', (error) => {
    // TODO 
    // - verify if a list is created, if yes: stop and delete each process.
    console.log(api.pid, 'web_server - error', error);
});

api.on('exit', (code, signal) => {
    // TODO 
    // - clean exit?
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






/* process manger service event handler */
pms.on('close', (code, signal) => {
    console.log(api.pid, 'pms- close', code, signal);
});
pms.on('disconnect', (code, signal) => {
    console.log(api.pid, 'pms - disconnect', code, signal);
});
pms.on('error', (error) => {
    console.log(api.pid, 'pms - error', error);
});
pms.on('exit', (code, signal) => {
    console.log(api.pid, 'pms - exit', code, signal);
});
pms.on('message', (msg) => {
    console.warn(msg);
});
