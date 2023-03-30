import mongoose from "mongoose";

export const init = async () => {
    try {
        const URI = process.env.MONGODB_URI
        await mongoose.connect(URI)
        console.log('Connected to: MongoDB')
    } catch (err) {
        console.error(err)
    }
}