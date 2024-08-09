"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_1 = require("../middleware/jwt/token");
const orderList_1 = __importDefault(require("../model/orderList"));
const user_1 = __importDefault(require("../model/user"));
const orderRouter = (0, express_1.Router)();
// * add order
orderRouter.post('/add-order/', (0, token_1.validateToken)(["customer"]), async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user._id).populate('cart.product');
        if (!user || user.cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        const order = new orderList_1.default({
            orderedUser: user,
            status: 'pending'
        });
        await order.save();
        res.status(200).json({
            message: "Order added successfully",
            data: order
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get all orders
orderRouter.get('/get-all-orders/', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const orders = await orderList_1.default.find().populate('orderedUser');
        res.status(200).json({
            message: "All orders",
            data: orders
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * update order status
orderRouter.put('/update-order-status/:id', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderList_1.default.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            message: "Order status updated successfully",
            data: order
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get order by id
orderRouter.get('/get-order/:id', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const order = (await orderList_1.default.findById(req.params.id).populate('orderedUser'));
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        const userCart = await user_1.default.findById(order.orderedUser._id).populate('cart.product');
        res.status(200).json({
            message: "Order",
            data: order,
            orderedCart: userCart.cart
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * delete order
orderRouter.delete('/delete-order/:id', (0, token_1.validateToken)(["customer", "admin"]), async (req, res) => {
    try {
        const order = await orderList_1.default.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order deleted successfully",
            data: order
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
// * get orders by product id
orderRouter.get('/get-orders-by-product-id/:id', (0, token_1.validateToken)(["admin"]), async (req, res) => {
    try {
        const { product_id } = req.params;
        const orders = await orderList_1.default.find({ 'cart.product': product_id }).populate('orderedUser');
        if (!orders) {
            return res.status(404).json({
                message: "Orders not found"
            });
        }
        res.status(200).json({
            message: "Orders",
            data: orders,
            count: orders.length
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = orderRouter;
//# sourceMappingURL=orderRoute.js.map