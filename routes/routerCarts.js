import * as dotenv from 'dotenv'
import { Router } from 'express'
import PersistenceFS from '../controllers/fsController.js'
import PersistenceMongo from '../controllers/mongoController.js'

dotenv.config()
const method = process.env.PERSISTANCE
let persistence
if (method==='mongodb') {
    persistence = new PersistenceMongo('cart')
} else {
    persistence = new PersistenceFS('db/products.json')
}

const routerCarts = Router()

routerCarts.post('/', async (req, res) => {
    if (req.body.user) {
        const response = await persistence.addItem(req.body)
        res.json(response)
    } else {
        res.json({ status: 'error', message: 'No user...' })
    }
})

routerCarts.post('/:cid/product/:pid', async (req, res) => {
    const query = await persistence.getById(req.params.cid)
    if (query.status === 'success') {
        const product = req.body
        product.id = req.params.pid
        if (!query.payload.quantity) {
            req.body.quantity = 1
        } else {
            req.body.quantity = parseInt(req.body.quantity)
        }
        if (!query.payload.products) {
            query.payload.products = []
        }
        const idx = query.payload.products.findIndex(item => item.id == req.params.pid)
        if (idx !== -1) {
            query.payload.products[idx].quantity += req.body.quantity
        } else {
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