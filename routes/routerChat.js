import { Router } from 'express'

const routerChat = Router()

routerChat.get('/', (req, res) => {
    res.render('chat')
})

export default routerChat