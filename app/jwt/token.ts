import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../model/user';
import { Request, Response, NextFunction } from 'express';

interface IToken {
    username: string;
    id: string;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}


dotenv.config();
const { sign, verify } = jwt;

export const createToken = (user : any) => {
    const accessToken = sign(
    {
        username : user.username,
        id:user.id,
        role: user.role
    },
    process.env.JWT_SECRET_KEY as string,
    );

    return accessToken;
}



export const validateToken = (role : string) => {
    return async (req : Request, res : Response, next : NextFunction) => {
        const authHeader = req.headers["authorization"] ;

                if (!authHeader) 
                    return res.status(400).json({error: "User not Authenticated"});
                    const token = authHeader.split(" ")[1];

                try {
                    const validToken = verify(token,  process.env.JWT_SECRET_KEY) as IToken;
                    const dbUser = await User.findOne({_id: validToken.id });
                    console.log(dbUser);

                    if (!dbUser) {
                        return res.status(400).json({error: "User Doesn't Exist"});
                    }
                    console.log(role);
                    if (role === validToken.role && dbUser.username === validToken.username) {
                        req.user = dbUser;
                        return next();
                    } else {
                        return res.status(400).json({error: "Invalid Token"});
                    }
                } catch(err) { 
                    return res.status(400).json({error: err});
                }
    }
}