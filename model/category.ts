import mongoose from 'mongoose';

const category = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
})

export default mongoose.model('Category', category);