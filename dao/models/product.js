import mongoose, {plugin} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const product = new mongoose.Schema({
    code: { type: String, require: true, unique: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    thumbnail: { type: String, require: false },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: false }
}, { timestamps: true })
product.plugin(mongoosePaginate)

export default mongoose.model('Product', product)