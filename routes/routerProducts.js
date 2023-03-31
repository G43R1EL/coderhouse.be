import { Router } from 'express'
import fsController from '../controllers/fsController.js'

const routerProducts = Router()

routerProducts.get('/', (req, res) => {
    const limit = Number(req.query.limit)
    res.json({ status: true, limit })
})

routerProducts.get('/:pid', (req, res) => {
    res.json({ status: true })
})

routerProducts.post('/', (req, res) => {
    res.json({ status: true })
})

routerProducts.put('/:pid', (req, res) => {
    res.json({ status: true })
})

routerProducts.delete('/:pid', (req, res) => {
    res.json({ status: true })
})

export default routerProducts