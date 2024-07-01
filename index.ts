import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import {createUser}  from './app/auth/register';
import {loginUser}  from './app/auth/login';
import db from './db/database';
import { validateToken } from './app/jwt/token';



const app = express();
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = 8080;
db(); // * database connection 




// ! Routes
app.post('/api/v1/register/', createUser);
app.post('/api/v1/login', loginUser)


// test routes
app.post('/profile',validateToken("customer"),(req,res) => {
    res.json({
        details: "This is the profile data",
    });
})
app.post('/adminprofile',validateToken("admin"),(req,res) => {
    res.json({
        details: "This is the admin profile data",
    });
})



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

