import { Router } from 'express';
import { validateToken } from '../app/jwt/token';
import Product from '../model/product';


const productRouter = Router();

interface IProduct {
    name: string,
    price: number,
    description: string,
    category: string,
    stock: number
}


// * create product
productRouter.post('/create-product/',validateToken(["admin" as string]), async (req : any,res : any) => {
    try {

        const { name, price, description, category, stock } = req.body as IProduct;

        if(!name || !price || !description || !stock ) {
            return res.status(400).json({
                message: "Please fill required fields"
            })
        }

        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock,
            
        })

        await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        });



    }catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

// * get all products
productRouter.get('/all-products/',validateToken(["customer" as string, "admin" as string]), async (req : any, res : any) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            message: "All products",
            data: products
        })
    }catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})





export default productRouter;



