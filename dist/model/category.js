"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const category = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },
});
exports.default = mongoose_1.default.model('Category', category);
//# sourceMappingURL=category.js.map