import mongoose from "mongoose";

const cart = mongoose.Schema({
    user: { type: string, require: true }
}, { timestamps: true })

export default mongoose.model('Cart', cart)