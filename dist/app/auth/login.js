"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../../middleware/jwt/token");
const user_1 = __importDefault(require("../../model/user"));
const loginUser = async (req, res) => {
    const { password, email } = req.body;
    const user = await user_1.default.findOne({ email: email });
    if (!user)
        res.status(400).json({ error: "User Doesn't Exist" });
    const dbPassword = user.password;
    bcrypt_1.default.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400)
                .json({ error: "Wrong email Or Password" });
        }
        else {
            const accessToken = (0, token_1.createToken)(user);
            res.json({
                message: "Login Success",
                token: accessToken,
                user: {
                    email: user.email,
                    role: user.role
                }
            });
        }
    });
};
exports.loginUser = loginUser;
//# sourceMappingURL=login.js.map