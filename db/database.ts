import mongoose from "mongoose";

const db = () => {
    mongoose.connect(process.env.MONGO_URI as string )
    .then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Not connected to database');
    });
}

export default db;