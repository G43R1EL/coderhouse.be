import mongoose from "mongoose";

const product = new mongoose.Schema({
    code: { type: String, require: true, unique: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    thumbnail: { type: String, require: false },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
}, { timestamps: true })

export default mongoose.model('Product', product)