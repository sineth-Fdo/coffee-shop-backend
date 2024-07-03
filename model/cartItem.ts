import mongoose from "mongoose";

const cartItem = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        
    },
    itemPrice : {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1
    }
})

export default mongoose.model('CartItem', cartItem);