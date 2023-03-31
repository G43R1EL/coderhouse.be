const productChk = (req, res, next) => {
    if (!req.body.code || !req.body.title || !req.body.description || !req.body.price || !req.body.stock || !req.body.category) {
        res.send({ status: 'error', message: 'All fields should be filled.' })
    } else {
        return next()
    }
}

export default productChk