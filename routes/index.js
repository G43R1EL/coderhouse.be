import { Router } from 'express';
import routerProducts from "./products.js";
import routerCarts from "./carts.js";
import routerChat from "./chat.js";

const router = Router()

router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)
router.use('/chat', routerChat)

router.get('/', (req, res) => {
    res.render('home', {})
})

export default router