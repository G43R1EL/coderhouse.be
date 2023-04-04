import * as dotenv from 'dotenv'
import { Router } from 'express'
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

const routerHome = Router()

// Muestra una plantilla Handlebars con la lista de productos
routerHome.get('/', async (req, res) => {
    const response = await persistence.getAll()
    const products = []
    response.payload.forEach(item => { products.push(item) })
    res.render('home', {products})
})

export default routerHome

