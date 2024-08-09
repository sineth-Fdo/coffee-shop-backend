"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const product = new mongoose_1.default.Schema({
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
    stock: {
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
    orderCount: {
        type: Number,
        required: false,
        default: 0
    }
});
exports.default = mongoose_1.default.model('Product', product);
//# sourceMappingURL=product.js.map