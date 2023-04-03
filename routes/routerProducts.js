import * as dotenv from 'dotenv'
import { Router } from 'express'
import productChk from '../helpers/productChk.js'
import PersistenceFS from '../controllers/fsController.js'
import PersistenceMongo from '../controllers/mongoController.js'

dotenv.config()
const method = process.env.PERSISTANCE
let persistence
if (method==='mongodb') {
    persistence = new PersistenceMongo('product')
} else {
    persistence = new PersistenceFS('db/products.json')
}

const routerProducts = Router()

routerProducts.get('/', async (req, res) => {
    const limit = Number(req.query.limit)
    const response = await persistence.getAll()
    if (limit && response.payload) {
        const products = []
        response.payload.forEach(item => { products.push(item) })
        if (limit < products.length) { products.length = limit }
        response.payload = products
    }
    res.json(response)
})

routerProducts.get('/:pid', async (req, res) => {
    const response = await persistence.getById(req.params.pid)
    res.json(response)
})

routerProducts.post('/', productChk, async (req, res) => {
    const response = await persistence.addItem(req.body)
    res.json(response)
})

routerProducts.put('/:pid', async (req, res) => {
    const response = await persistence.updateById(req.params.pid, req.body)
    res.json(response)
})

routerProducts.delete('/:pid', async (req, res) => {
    const response = await persistence.removeById(req.params.pid)
    res.json(response)
})

export default routerProducts