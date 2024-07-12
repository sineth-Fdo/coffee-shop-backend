import { Router } from 'express';
import { validateToken } from '../middleware/jwt/token';
import Category from '../model/category';


const categoryRouter = Router();

categoryRouter.post('/create-category/', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Please fill required fields"
            });
        }

        const categoryExist = await Category.findOne({ name });
        if (categoryExist) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const newCategory = new Category({
            name
        });

        await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory
        });

    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

categoryRouter.get('/get-categories/', validateToken(["admin", "customer"]), async (req: any, res: any) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "All categories",
            data: categories
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

categoryRouter.delete('/delete-category/', validateToken(["admin"]), async (req: any, res: any) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                message: "Please provide category id"
            });
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (err: any) {
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

export default categoryRouter;