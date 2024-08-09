"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartItem = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
    },
    itemPrice: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1
    }
});
exports.default = mongoose_1.default.model('CartItem', cartItem);
//# sourceMappingURL=cartItem.js.map