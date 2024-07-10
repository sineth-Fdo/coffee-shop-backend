import bcrypt from "bcrypt";
import { createToken } from "../../middleware/jwt/token";
import User from "../../model/user";


export const loginUser = async (req: any, res: any) => {
    const {password, email } = req.body;

    const user = await User.findOne({email: email});

    if (!user) res.status(400).json({error: "User Doesn't Exist"});

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400)
            .json({error: "Wrong email Or Password"});
        }else {
            const accessToken = createToken(user);
        
            res.json({
                message: "Login Success",
                token: accessToken,
                user: {
                    email: user.email,
                    role: user.role
                }
            });
        }

    })
};

