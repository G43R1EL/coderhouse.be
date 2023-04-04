// Imports... Dotenv, Express, Routers...
import * as dotenv from 'dotenv'
import express from 'express'
import router from './routes/index.js'
import router404 from './routes/router404.js'
import { init } from './dao/dbConnection.js'
import { createServer } from 'http'
import initSocket from './ioChat.js'

// Cargo las variables de Dotenv
dotenv.config()

//Creo el servidor express y http e incio el socket
const app = express()
const server = createServer(app)
const io = initSocket(server)
init()

// Configuración básica de express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Configuración handlebars
app.set('view engine', 'hbs')
app.set('views', './views')
app.set('view options', { layout: './layouts/main' })

// Configuración de rutas
app.use('/', router)
app.use('*', router404)

// Inicio el servidor
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

// Manejo de errores del servidor
server.on('error', (err) => {
    console.error(`Server error: ${err}`)
})