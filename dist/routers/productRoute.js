"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../middleware/jwt/token");
const product_1 = __importDefault(require("../model/product"));
const productRouter = (0, express_1.Router)();
// * create product
productRouter.post('/create-product/', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const { name, price, description, category, stock, image } = req.body;
        if (!name || !price || !description || !stock) {
            return res.status(400).json({
                message: "Please fill required fields"
            });
        }
        const newProduct = new product_1.default({
            name,
            price,
            description,
            category,
            stock,
            image
        });
        await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get all products
productRouter.get('/all-products/', (0, token_1.validateToken)(["customer", "admin"]), async (req, res) => {
    try {
        const products = await product_1.default.find();
        res.status(200).json({
            message: "All products",
            data: products
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get product by id
productRouter.get('/details/:id', (0, token_1.validateToken)(["customer", "admin"]), async (req, res) => {
    try {
        const product = await product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json({
            message: "Product",
            data: product
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * delete product
productRouter.delete('/delete/:id', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const product = await product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        await product_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Product deleted successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get products by category
productRouter.get('/category/:category', (0, token_1.validateToken)(["customer", "admin"]), async (req, res) => {
    try {
        const products = await product_1.default.find({ category: req.params.category });
        res.status(200).json({
            message: "Products",
            data: products
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = productRouter;
//# sourceMappingURL=productRoute.js.map