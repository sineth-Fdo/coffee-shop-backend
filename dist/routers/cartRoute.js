"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../middleware/jwt/token");
const product_1 = __importDefault(require("../model/product"));
const user_1 = __importDefault(require("../model/user"));
const cartRouter = (0, express_1.Router)();
// * Add product to cart
cartRouter.post('/add-to-cart/:product_id/:qty', (0, token_1.validateToken)(["customer"]), async (req, res) => {
    try {
        const { product_id, qty } = req.params;
        const user = await user_1.default.findById(req.user._id).populate('cart.product');
        const product = await product_1.default.findById(product_id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        // Check if the product is already in the cart
        const isProductInCart = user.cart.some((item) => item.product && item.product._id && item.product._id.toString() === product_id.toString());
        if (isProductInCart) {
            return res.status(400).json({
                message: "Product already in cart"
            });
        }
        const itemPriceWithQty = product.price * qty;
        user.cart.push({ product: product._id, quantity: qty, itemPrice: itemPriceWithQty, });
        user.total += itemPriceWithQty;
        await user.save();
        res.status(200).json({
            message: "Product added to cart successfully",
            data: user.cart
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * Get all cart items
cartRouter.get('/get-cart/', (0, token_1.validateToken)(["customer"]), async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user._id).populate('cart.product');
        res.status(200).json({
            message: "Cart items",
            data: user
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * delete item from cart
cartRouter.delete('/delete-item/:itemId/', (0, token_1.validateToken)(["customer"]), async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user._id).populate('cart.product');
        const itemIndex = user.cart.findIndex((item) => item._id.toString() === req.params.itemId.toString());
        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Item not found"
            });
        }
        user.cart.splice(itemIndex, 1);
        user.total = user.cart.reduce((acc, item) => acc + item.itemPrice, 0);
        await user.save();
        res.status(200).json({
            message: "Item deleted successfully",
            data: user.cart
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = cartRouter;
//# sourceMappingURL=cartRoute.js.map