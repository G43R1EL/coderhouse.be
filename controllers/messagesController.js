import MessageModel from '../dao/models/message.js'

class MessagesController {
    static async create (message) {
        const status = await MessageModel.create(message)
        console.log(status)
    }

    static async read() {
        const messages = await MessageModel.find()
        return messages
    }
}

export default MessagesController