import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import engine from 'express-handlebars'
import viewsRouter from './routes/views.js'
import ProductManager from './productmanager.js'

const prodmgr = new ProductManager('data/db.json')

const hbs = engine.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: './views/layout'
})

const app = express()
const server = createServer(app)
const io = new Server(server, {})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewsRouter)

io.on('connection', async (socket) => {
    let products = await prodmgr.getProducts()
    console.log('user connected');
    socket.emit('products', products)
    socket.on('ADD_PRODUCT', product => {
        prodmgr.addProduct(product).then((msg)=>{
            if (msg.success) {
                prodmgr.getProducts().then((prod) => {
                    io.sockets.emit('products', prod)
                })
            } else {
                console.error(msg.error)
            }
        })
    })
});

const PORT = 8080
server.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})

server.on('error', (err) => {
    console.error(`Error: ${err}`)
})