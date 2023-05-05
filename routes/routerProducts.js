import * as dotenv from 'dotenv'
import { Router } from 'express'
import productChk from '../helpers/productChk.js'
import PersistenceFS from '../controllers/fsController.js'
import PersistenceMongo from '../controllers/mongoController.js'

// Levanta la configuración de dotenv y selecciona el tipo de persistencia... Si no se especifica usa fs
dotenv.config()
const method = process.env.PERSISTANCE
let persistence
if (method==='mongodb') {
    persistence = new PersistenceMongo('product')
} else {
    persistence = new PersistenceFS('db/products.json')
}

const routerProducts = Router()

// Enpoint envia respuesta con estado y payload (lista de productos)
routerProducts.get('/', async (req, res) => {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const sort = req.query.sort || ''
    const query = req.query.query || ''
    const response = await persistence.getAll(limit, page, sort, query)
    console.log(response.payload.docs)
    res.json(response)
})

// Enpoint busca producto por ID
routerProducts.get('/:pid', async (req, res) => {
    const response = await persistence.getById(req.params.pid)
    res.json(response)
})

// Postea productos... Utiliza un middleware que solo verifica los campos requeridos...
routerProducts.post('/', productChk, async (req, res) => {
    const response = await persistence.addItem(req.body)
    res.json(response)
})

// Actualiza un producto por ID
routerProducts.put('/:pid', async (req, res) => {
    const response = await persistence.updateById(req.params.pid, req.body)
    res.json(response)
})

// Elimina un producto por ID
routerProducts.delete('/:pid', async (req, res) => {
    const response = await persistence.removeById(req.params.pid)
    res.json(response)
})

export default routerProducts