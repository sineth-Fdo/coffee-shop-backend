"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderList = new mongoose_1.default.Schema({
    orderedUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['none', 'pending', 'completed'],
        default: 'none',
    },
});
exports.default = mongoose_1.default.model('OrderList', orderList);
//# sourceMappingURL=orderList.js.map