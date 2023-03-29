import { Router } from "express";

const routerProducts = Router()

routerProducts.get('/', (req, res) => {
    res.json({ status: true })
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