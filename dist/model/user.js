"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItem_1 = __importDefault(require("./cartItem"));
const user = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    cart: {
        type: [cartItem_1.default.schema],
        default: []
    },
    total: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model('User', user);
//# sourceMappingURL=user.js.map