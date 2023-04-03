import { Router } from 'express'
import routerProducts from './routerProducts.js'
import routerCarts from './routerCarts.js'
import routerChat from './routerChat.js'
import routerHome from './routerHome.js'

const router = Router()

router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)
router.use('/chat', routerChat)
router.use('/', routerHome)

export default router