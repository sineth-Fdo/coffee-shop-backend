import { Router } from 'express';
import { validateToken } from '../middleware/jwt/token';
import Product from '../model/product';
import User from '../model/user';

const cartRouter = Router();

interface IProductId {
    product_id: string;
}

// * Add product to cart
cartRouter.post('/add-to-cart/', validateToken(["customer"]), async (req: any, res: any) => {
    try {
        const { product_id  }   = req.body as IProductId ;
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

        user.cart.push({ product: product._id, quantity: 1, itemPrice: product.price,});
        user.total += product.price as number;
        await user.save();

        res.status(200).json({
            message: "Product added to cart successfully",
            data: user.cart
        });
        

    } catch (err: any) {
    
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * Get all cart items
cartRouter.get('/get-cart/', validateToken(["customer"]), async (req: any, res: any) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.status(200).json({
            message: "Cart items",
            data: user.cart
        });
    } catch (err: any) {
        
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

// * delete item from cart
cartRouter.delete('/delete-item/:itemId/', validateToken(["customer"]), async (req: any, res: any) => {
    try {

        const user = await User.findById(req.user._id).populate('cart.product');
        const itemIndex = user.cart.findIndex((item: any) => item._id.toString() === req.params.itemId.toString());

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        user.cart.splice(itemIndex, 1);
        user.total = user.cart.reduce((acc: number, item: any) => acc + item.itemPrice, 0);
        await user.save();

        res.status(200).json({
            message: "Item deleted successfully",
            data: user.cart
        });


    }catch(err : any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});



export default cartRouter;
