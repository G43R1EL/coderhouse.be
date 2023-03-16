import {Router} from 'express'
import ProductManager from '../productmanager.js'

const prodmgr = new ProductManager('data/db.json')
const viewsRouter = Router()

viewsRouter.get('/', async (req, res) => {
    const products = await prodmgr.getProducts()
    res.render('home', { products })
})

viewsRouter.get('/realTimeProducts', async (req, res) => {
    const products = await prodmgr.getProducts()
    res.render('realTimeProducts', { products })
})

export default viewsRouter