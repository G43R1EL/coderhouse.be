const socket = io()

const messagesTable = document.getElementById('tbl_messages')
const sendMessage = document.getElementById('btn_sendMessage')

const renderMsg = async (messages) => {
    const msgTemplate = await (await fetch('views/messages.hbs')).text()
    const msgTable = Handlebars.compile(msgTemplate)
    return msgTable({messages})
}

socket.on('MESSAGES', (messages) => {
    renderMsg(messages).then(msgTable => {
        messagesTable.innerHTML = msgTable
    })
})

sendMessage.addEventListener('click', (e) => {
    e.preventDefault()
    const user = document.getElementById('txt_user')
    const message = document.getElementById('txt_message')
    const msg = {
        user: user.value,
        message: message.value,
    }
    socket.emit('MESSAGE', msg)
    message.value = ''
})