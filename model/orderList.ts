import mongoose from "mongoose";

const orderList = new mongoose.Schema({
    
    orderedUser : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date : {
        type: Date,
        default: Date.now
    },
    status : {
        type: String,
        required: true,
        enum: ['none', 'pending', 'completed'],
        default: 'none',
    },
    

})


export default mongoose.model('OrderList', orderList);