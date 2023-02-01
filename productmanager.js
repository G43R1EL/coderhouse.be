// DESAFIO => FileSystem
const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        fs.existsSync(this.path) ? this._read() : this._write()
    }

    _read () {
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    }

    _write () {
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let product = this.products.find(prod => prod.id == id)
        if (product) {
            return product
        } else {
            console.error(`Not found: El producto con id '${id}' no se encuentra.`)
            return null
        }
    }

    addProduct (product) {
        if (!this.products.find(prod => prod.code === product.code)) {
            if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                product.id = Date.now()
                this.products.push(product)
                this._write()
            } else {
                console.error('Todos los campos son obligatorios, producto no agregado.')
            }
        } else {
            console.error(`El producto con código '${product.code}' ya existe... Producto no agregado.`)
        }
    }

    updateProduct (id, updatedPrd) {
        let productIdx = this.products.findIndex(product => product.id === id)
        for (const property in updatedPrd) {
            if (this.products[productIdx][property]) {
                this.products[productIdx][property] = updatedPrd[property]
                this._write()
            } else {
                console.error(`El valor ${property} no existe no se actualizará en el producto...`)
            }
        }
    }

    deleteProduct (id) {
        this.products = this.products.filter(product => product.id !== id)
        this._write()
    }
}

// TESTING
