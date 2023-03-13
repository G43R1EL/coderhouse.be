// DESAFIO => FileSystem
import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        fs.existsSync(this.path) ? this._read() : this._write()
    }

    async _read () {
        try {
            this.products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } catch (error) {
            console.error(error)
        }
    }

    async _write () {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.error(error)
        }

    }

    async getProducts() {
        try {
            return this.products
        } catch (error) {
            console.error(error)
        }
    }

    async getProductById(id) {
        try {
            let product = this.products.find(prod => prod.id == id)
            if (product) {
                return product
            } else {
                return {error: `El id: ${id} no existe.`}
            }
        } catch (error) {
            console.error(error)
        }

    }

    async addProduct (product) {
        try {
            if (!this.products.find(prod => prod.code === product.code)) {
                if (product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
                    product.id = Date.now()
                    this.products.push(product)
                    await this._write()
                    return {success: product.id}
                } else {
                    return {error: 'Todos los campos son necesarios, producto no agregado.'}
                }
            } else {
                return {error: `El producto con código '${product.code}' ya existe, producto no agregado.`}
            }
        } catch (error) {
            console.error(error)
        }

    }

    async updateProduct (id, updatedPrd) {
        try {
            const productIdx = this.products.findIndex(product => product.id === id)
            for (const property in updatedPrd) {
                if (this.products[productIdx][property]) {
                    this.products[productIdx][property] = updatedPrd[property]
                    await this._write()
                    return {success: 'Producto actualizado con éxito.'}
                } else {
                    return {error: `El valor ${property} no existe no se actualizará en el producto.`}
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteProduct (id) {
        try {
            if (await this.getProductById(id)) {
                this.products = this.products.filter(product => product.id !== id)
                await this._write()
                return {success: `El producto ${id} fue eliminado.`}
            } else {
                return {error: `El id: ${id} no existe.`}
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default ProductManager