"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../middleware/jwt/token");
const category_1 = __importDefault(require("../model/category"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.post('/create-category/', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Please fill required fields"
            });
        }
        const categoryExist = await category_1.default.findOne({ name });
        if (categoryExist) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }
        const newCategory = new category_1.default({
            name
        });
        await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
categoryRouter.get('/get-categories/', (0, token_1.validateToken)(["admin", "customer"]), async (req, res) => {
    try {
        const categories = await category_1.default.find();
        res.status(200).json({
            message: "All categories",
            data: categories
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
categoryRouter.delete('/delete-category/', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "Please provide category id"
            });
        }
        const category = await category_1.default.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }
        res.status(200).json({
            message: "Category deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = categoryRouter;
//# sourceMappingURL=categoryRoute.js.map