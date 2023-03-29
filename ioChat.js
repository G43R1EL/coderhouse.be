import { Server } from "socket.io";

const initSocket = async (httpServer) => {
    const io = new Server(httpServer, {})
    const messages = [{user: 'System', message: 'Bienvenido al chat...'}]
    
    io.on('connection', async (socket) => {
        socket.emit('MESSAGES', messages)
        socket.on('MESSAGE', message => {
            messages.push(message)
            io.sockets.emit('MESSAGES', messages)
        })
    })

    return io
}

export default initSocket