import { Server } from 'socket.io'
import MessagesController from './controllers/messagesController.js'

const initSocket = async (httpServer) => {
    const io = new Server(httpServer, {})
    const messages = await MessagesController.read()
    
    io.on('connection', async (socket) => {
        socket.emit('MESSAGES', messages)
        socket.on('MESSAGE', message => {
            messages.push(message)
            MessagesController.create(message)
            io.sockets.emit('MESSAGES', messages)
        })
    })

    return io
}

export default initSocket