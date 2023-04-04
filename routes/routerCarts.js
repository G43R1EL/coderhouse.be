import * as dotenv from 'dotenv'
import { Router } from 'express'
import PersistenceFS from '../controllers/fsController.js'
import PersistenceMongo from '../controllers/mongoController.js'

// Segun Dotenv determina el tipo de persistencia usar
dotenv.config()
const method = process.env.PERSISTANCE
let persistence
if (method==='mongodb') {
    persistence = new PersistenceMongo('cart')
} else {
    persistence = new PersistenceFS('db/products.json')
}

const routerCarts = Router()

// Crea un nuevo carro
routerCarts.post('/', async (req, res) => {
    if (req.body.user) {
        const response = await persistence.addItem(req.body)
        res.json(response)
    } else {
        res.json({ status: 'error', message: 'No user...' })
    }
})

// Agrega un producto al carro
routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const query = await persistence.getById(req.params.cid)
    if (query.status === 'success') {
        const product = req.body
        product.id = req.params.pid
        // Si no se define la cantidad por defecto será 1
        if (!query.payload.quantity) {
            req.body.quantity = 1
        } else {
            // Si ya esta la cantidad en el body entonces la convierte a integer ya que por defecto lo toma como sting.
            req.body.quantity = parseInt(req.body.quantity)
        }
        // Si el carro no posee lista de productos se crea un array vacío
        if (!query.payload.products) {
            query.payload.products = []
        }
        const idx = query.payload.products.findIndex(item => item.id == req.params.pid)
        if (idx !== -1) {
            // Si no es -1 es porque ya existe el producto en el carro... Debe sumar
            query.payload.products[idx].quantity += req.body.quantity
        } else {
            // Si el producto no existe lo agrega
            query.payload.products.push(product)
        }
        const response = await persistence.updateById(req.params.cid, query.payload)
        res.json(response)
    } else {
        res.json(query)
    }
})

routerCarts.get('/:cid', async (req, res) => {
    const response = await persistence.getById(req.params.cid)
    res.json(response)
})

export default routerCarts