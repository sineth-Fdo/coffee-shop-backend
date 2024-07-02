import mongoose from "mongoose";
import  CartItem  from "./cartItem";


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
        
    },
    cart : {
        type: [CartItem.schema],
        default: []
    },
    total : {
        type: Number,
        default: 0
    }
})

export default mongoose.model('User', user);