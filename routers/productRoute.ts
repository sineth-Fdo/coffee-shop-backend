import { Router } from 'express';
import { validateToken } from '../middleware/jwt/token';
import Product from '../model/product';


const productRouter = Router();

interface IProduct {
    name: string,
    price: number,
    description: string,
    category: string,
    stock: number,
    image: string
}

// * create product
productRouter.post('/create-product/',validateToken(["admin" as string]), async (req : any,res : any) => {
    try {

        const { name, price, description, category, stock, image } = req.body as IProduct;

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
            image
            
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
});


// * get product by id
productRouter.get('/details/:id',validateToken(["customer" as string, "admin" as string]), async (req : any, res : any) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product",
            data: product
        })
    }catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

// * delete product
productRouter.delete('/delete/:id',validateToken(["admin" as string]), async (req : any, res : any) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Product deleted successfully"
        })
    }catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});

// * get products by category
productRouter.get('/category/:category',validateToken(["customer" as string, "admin" as string]), async (req : any, res : any) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json({
            message: "Products",
            data: products
        })
    }
    catch(err : any) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
);





export default productRouter;



