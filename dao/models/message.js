import mongoose from "mongoose";

const message = mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true}
}, { timestamps: true })

export default mongoose.model('Message', message)