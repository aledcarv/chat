const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/public`);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let message = []

io.on('connection', socket => {
    console.log(`socket connected: ${socket.id}`);

    socket.emit('oldMessages', message);

    socket.on('sendMessage', data => {
        message.push(data);
        socket.broadcast.emit('receiveMessage', data);
    });
});

server.listen(3000);