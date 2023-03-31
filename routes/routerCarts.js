import { Router } from "express";

const routerCarts = Router()

routerCarts.post('/', (req, res) => {
    res.json({ status: true })
})

routerCarts.post('/:cid', (req, res) => {
    res.json({ status: true })
})

routerCarts.get('/:cid', (req, res) => {
    res.json({ status: true })
})

export default routerCarts