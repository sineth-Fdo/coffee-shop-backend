import bcrypt from "bcrypt";
import User from "../../model/user";

interface IRegister {
    username: string;
    email: string;
    password: string;
    mobile: number;
    role: string;
}


// This function is used to create a new user
export const createUser =  (req : any, res : any) => {
    const { username, password, mobile, role, email } = req.body as IRegister;

    const emailRegex = /\S+@\S+\.\S+/;
    if(!emailRegex.test(email)) {
        return res.json('Invalid Email').status(400);
    }
    
    bcrypt.hash(password as string,10 as number).then((hash) => {
        User.create({
            username: username,
            email: email,
            password: hash,
            mobile: mobile,
            role: role,
        }).then(() => {
            res.json('User Registered');
        
        }).catch((err : Error) => {
            res.json(err.message).status(400);
        })
    })


}



