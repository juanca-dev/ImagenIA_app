import mongoose from "mongoose";

mongoose

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(url)
        .then(() => console.log('conexión exitosa'))
        .then(() => console.log('Fallo la conexión'))
}

export default connectDB;