/**
   (c) Copyright 2019 locha.io project developers
   Licensed under a MIT license, see LICENSE file in the root folder
   for a full text.
*/

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 3000;

app.use('/js', express.static(__dirname + '/html/js'));
app.use('/css', express.static(__dirname + '/html/css'));
app.use('/img', express.static(__dirname + '/html/img'));
app.use(express.static(__dirname + '/html'));

io.on('connection', (client) => {
    // cada vez que un cliente establece conexion,
    // enviamos al proceso padre la información 
    // sobre el cliente.
    process.send({
        type: 'socket_io',
        event: 'connection',
        data: {
            client: client.id
        }
    });
    // cliente desconecta, se envia al padre de igual forma
    // la información sobre el cliente desconectado.
    client.on('disconnect', () => {
        process.send({
            type: 'socket_io',
            event: 'disconnect',
            data: {
                client: client.id
            }
        });
    });
    // el cliente comparte la lista de peers a ejecutar
    client.on('peer_list', (msg) => {
        process.send({
            type: 'socket_io',
            event: 'peer_list',
            data: msg
        });
    });
});

io.on('error', (error) => {
    process.send({
        type: 'socket_io',
        event: 'error',
        data: { error: error }
    });
});

http.listen(PORT, () => {
    process.send({
        type: 'web_server',
        event: 'listen',
        data: { port: PORT }
    });
});