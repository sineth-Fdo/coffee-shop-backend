import { Router } from 'express';
import { validateToken } from '../app/jwt/token';
import User from '../model/user';
import OrderList from '../model/orderList';

const orderRouter = Router();

// * add order
orderRouter.post('/add-order/', validateToken(["customer"]), async (req: any, res: any) => {
    try {
        
        const user = await User.findById(req.user._id).populate('cart.product');

        

        if (!user || user.cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            }); 
        }

        const order= new OrderList({
            orderedUser: user,
            status: 'pending'
        });
        await order.save();
        res.status(200).json({
            message: "Order added successfully",
            data: order
        });
    }
    catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
);

// * get all orders
orderRouter.get('/get-all-orders/', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const orders = await OrderList.find().populate('orderedUser');
        res.status(200).json({
            message: "All orders",
            data: orders
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * update order status
orderRouter.put('/update-order-status/:id', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const { status } = req.body;
        const order = await OrderList.findById(req.params.id);

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
    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * get order by id
orderRouter.get('/get-order/:id', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const order = await OrderList.findById(req.params.id).populate('orderedUser');
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order",
            data: order
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * delete order
orderRouter.delete('/delete-order/:id', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const order = await OrderList.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            message: "Order deleted successfully",
            data: order
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * get orders by product id
orderRouter.get('/get-orders-by-product-id/:id', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const { product_id } = req.params;
        const orders = await OrderList.find({ 'cart.product': product_id }).populate('orderedUser');
        if (!orders) {
            return res.status(404).json({
                message: "Orders not found"
            });
        }

        res.status(200).json({
            message: "Orders",
            data: orders
        });

    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});


export default orderRouter;