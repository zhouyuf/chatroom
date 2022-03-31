const http = require('http');
const io = require('socket.io');

const httpServer = http.createServer();
httpServer.listen(3333, () => {
    console.log('server runing at 127.0.0.1:3333');
})

const socketServer = io(httpServer, { cors: true });
socketServer.on('connection', (socket) => {
    console.log('客户端有连接')
    
    // 监听客户端断开
    socket.on('disconnect', () => {
        console.log('客户端断开')
    })
    
    // 给客户端发送消息
    socket.emit('welcome','欢迎连接socket')

    // 监听客户端消息
    socket.on('hello', (data) => {
        console.log("客户端信息：", data);
        socket.emit('welcome', data);
    })

});