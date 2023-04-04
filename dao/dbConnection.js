import mongoose from "mongoose";

// Inicia la conexión con Mongo
export const init = async () => {
    try {
        const URI = process.env.MONGODB_URI
        await mongoose.connect(URI)
        console.log('Connected to: MongoDB')
    } catch (err) {
        console.error(err)
    }
}