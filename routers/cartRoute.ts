import { Router } from 'express';
import { validateToken } from '../app/jwt/token';
import Product from '../model/product';

const cartRouter = Router();

// * add product to cart using product id and user id
cartRouter.post('/add-to-cart/',validateToken(["customer"]), async (req : any,res : any) => {

    try {
        const { product_id } = req.body;
        const user = req.user;
        const product = await Product.findById(product_id);

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        user.cart.push(product);
        await user.save();

        res.status(200).json({
            message: "Product added to cart successfully",
            data: user.cart
        })


    }catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

export default cartRouter;