import mongoose from "mongoose";

const cart = mongoose.Schema({
    user: { type: String, require: true, unique: true },
    products: { type: Array, require: false }
}, { timestamps: true })

export default mongoose.model('Cart', cart)