import { Router } from 'express';
import { validateToken } from '../app/jwt/token';
import Product from '../model/product';
import User from '../model/user';

const cartRouter = Router();

// Add product to cart
cartRouter.post('/add-to-cart/', validateToken(["customer"]), async (req: any, res: any) => {
    try {
        const { product_id } = req.body;
        const user = await User.findById(req.user._id).populate('cart.product');
        const product = await Product.findById(product_id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Check if the product is already in the cart
        const isProductInCart = user.cart.some((item: any) => item.product && item.product._id && item.product._id.toString() === product_id.toString());

        if (isProductInCart) {
            return res.status(400).json({
                message: "Product already in cart"
            });
        }

        // Add product to cart
        user.cart.push({ product: product._id, quantity: 1 });
        await user.save();

        res.status(200).json({
            message: "Product added to cart successfully",
            data: user.cart
        });
        

    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

export default cartRouter;
