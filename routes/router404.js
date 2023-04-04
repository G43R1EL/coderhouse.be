import { Router } from 'express'

// Router para gestionar las rutas que no se encuentran... Sólo muestra un mensaje.
const router404 = Router()

router404.get('/', (req, res) => {
    res.send('<h1>404!</h1><h1>No encontrado...</h1>')
})

export default router404