"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../../model/user"));
// This function is used to create a new user
const createUser = (req, res) => {
    const { username, password, mobile, role, email } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.json('Invalid Email').status(400);
    }
    bcrypt_1.default.hash(password, 10).then((hash) => {
        user_1.default.create({
            username: username,
            email: email,
            password: hash,
            mobile: mobile,
            role: role,
        }).then(() => {
            res.json('User Registered');
        }).catch((err) => {
            res.json(err.message).status(400);
        });
    });
};
exports.createUser = createUser;
//# sourceMappingURL=register.js.map