import { Router } from 'express'

const routerChat = Router()

// Muestra una plantilla de handlebars que contiene el chat
routerChat.get('/', (req, res) => {
    res.render('chat')
})

export default routerChat