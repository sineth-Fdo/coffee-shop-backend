"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../model/user"));
dotenv_1.default.config();
const { sign, verify } = jsonwebtoken_1.default;
const createToken = (user) => {
    const accessToken = sign({
        username: user.username,
        id: user.id,
        role: user.role
    }, process.env.JWT_SECRET_KEY);
    return accessToken;
};
exports.createToken = createToken;
const validateToken = (roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader)
            return res.status(400).json({ error: "User not Authenticated" });
        const token = authHeader.split(" ")[1];
        try {
            const validToken = verify(token, process.env.JWT_SECRET_KEY);
            const dbUser = await user_1.default.findOne({ _id: validToken.id });
            if (!dbUser) {
                return res.status(400).json({ error: "User Doesn't Exist" });
            }
            if (roles.includes(validToken.role) && dbUser.username === validToken.username) {
                req.user = dbUser;
                return next();
            }
            else {
                return res.status(400).json({ error: "Invalid Token" });
            }
        }
        catch (err) {
            return res.status(400).json({ error: err });
        }
    };
};
exports.validateToken = validateToken;
//# sourceMappingURL=token.js.map