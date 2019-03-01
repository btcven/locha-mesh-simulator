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
    process.send({
        type: 'socket_io',
        event: 'connection',
        data: { client: client.id }
    });

    client.on('disconnect', () => {
        process.send({
            type: 'socket_io',
            event: 'disconnect',
            data: { client: client.id }
        });
    })
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