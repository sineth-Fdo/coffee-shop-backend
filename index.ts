// packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';

// file imports
import { loginUser } from './app/auth/login';
import { createUser } from './app/auth/register';
import db from './db/database';
import cartRouter from './routers/cartRoute';
import category from './routers/categoryRoute';
import orderRouter from './routers/orderRoute';
import productRouter from './routers/productRoute';



const app = express();
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = 8080;
db(); // * database connection 




// ! Routes
app.post('/api/v1/register/', createUser);
app.post('/api/v1/login/', loginUser);

app.use('/api/v1/product',productRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/order',orderRouter);
app.use('/api/v1/category',category);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

