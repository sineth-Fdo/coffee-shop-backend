import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
        required: true
    },
    role : {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
        
    }
})

export default mongoose.model('User', user);