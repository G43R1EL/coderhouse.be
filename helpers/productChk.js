// Middleware para revisar que esten todos los campos...
const productChk = (req, res, next) => {
    const { code, title, description, price, stock, category } = req.body
    if (!code || !title || !description || !price || !stock || !category) {
        return res.status(400).json({ status: 'error', message: 'Missing fields' })
    }
    next()
}

export default productChk