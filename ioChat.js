// Imports para trabajar con socke.io
import { Server } from 'socket.io'
import MessagesController from './controllers/messagesController.js'

//Inicia el socket...
const initSocket = async (httpServer) => {
    const io = new Server(httpServer, {})
    const messages = await MessagesController.read()
    
    // Cuando se conecta socket.io
    io.on('connection', async (socket) => {
        socket.emit('MESSAGES', messages)
        // Cuando se recibe algún mensaje
        socket.on('MESSAGE', message => {
            messages.push(message)
            MessagesController.create(message)
            io.sockets.emit('MESSAGES', messages)
        })
    })

    return io
}

export default initSocket