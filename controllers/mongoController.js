import ProductModel from '../dao/models/product.js'
import CartModel from '../dao/models/cart.js'
class PersistenceMongo {
    constructor(model) {
        switch (model) {
            case 'product':
                this.model = ProductModel
                break
            case 'cart':
                this.model = CartModel
                break
        }
    }
    
    async getAll() {
        const response = await this.model.find()
        return { status: 'success', payload: response }
    }
    
    async getById(id) {
        const response = await this.model.findById(id)
        if (response) {
            return { status: 'success', payload: response }
        } else {
            return { status: 'error', message: `Id: ${id} not found.` }
        }
    }
    
    async addItem(item) {
        const response = await this.model.create(item)
        return { status: 'success', payload: response }
    }
    
    async updateById(id, update) {
        if (id.toString().length === 24) {
            const response = await this.model.updateOne({_id: id}, update)
            return { status: 'success', payload: response }
        } else {
            return { status: 'error', message: `Invalid ID: ${id}`}
        }
    }
    
    async removeById(id) {
        if (id.toString().length === 24) {
            const response = await this.model.deleteOne({_id: id})
            return { status: 'success', payload: response }
        } else {
            return { status: 'error', message: `Invalid ID: ${id}`}
        }
    }
}

export default PersistenceMongo