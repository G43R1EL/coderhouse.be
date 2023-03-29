import * as dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";
import router404 from "./routes/404.js";
import { init } from "./dao/dbConnection.js";
import { createServer } from "http";
import initSocket from "./ioChat.js";

dotenv.config()
const app = express()
const server = createServer(app)
const io = initSocket(server)
init()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'hbs')
app.set('views', './views')
app.set('view options', { layout: './layouts/main' })

app.use('/', router)
app.use('*', router404)

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})

server.on('error', (err) => {
    console.error(`Error en el servidor: ${err}`)
})