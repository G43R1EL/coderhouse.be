import express from 'express'
import ProductManager from "./productmanager.js"

const prodmgr = new ProductManager('data/db.json')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const productos = await prodmgr.getProducts()
    if (productos.length > req.query.limit) {
        productos.length = req.query.limit
    }
    res.send(productos)
})

app.get('/products/:pid', async (req, res) => {
    const producto = await prodmgr.getProductById(req.params.pid)
    res.send(producto)
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`)
})

server.on('error', (err) => {
    console.error(`Error: ${err}`)
})