import bcrypt from "bcrypt";
import User from "../../model/user";
import { createToken } from "../jwt/token";


export const loginUser = async (req: any, res: any) => {
    const { username , password } = req.body;

    const user = await User.findOne({username: username});

    if (!user) res.status(400).json({error: "User Doesn't Exist"});

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400)
            .json({error: "Wrong Username Or Password"});
        }else {
            const accessToken = createToken(user);
        
    
            res.json(accessToken);
        }

    })
};