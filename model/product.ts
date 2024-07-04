import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'No Name'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'uncategorized'
    },
    stock : {
        type: Number,
        required: false,
        default: 1
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: false,
        default: 'https://res.cloudinary.com/dkkgmzpqd/image/upload/v1631978463/ecommerce/placeholder.png'
    },
    orderCount : {
        type: Number,
        required: false,
        default: 0
    }
    

})

export default mongoose.model('Product', product);