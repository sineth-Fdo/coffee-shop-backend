"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// file imports
const login_1 = require("./app/auth/login");
const register_1 = require("./app/auth/register");
const database_1 = __importDefault(require("./db/database"));
const cartRoute_1 = __importDefault(require("./routers/cartRoute"));
const categoryRoute_1 = __importDefault(require("./routers/categoryRoute"));
const orderRoute_1 = __importDefault(require("./routers/orderRoute"));
const productRoute_1 = __importDefault(require("./routers/productRoute"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
dotenv_1.default.config();
const PORT = 8080;
(0, database_1.default)(); // * database connection 
// ! Routes
app.post('/api/v1/register/', register_1.createUser);
app.post('/api/v1/login/', login_1.loginUser);
app.use('/api/v1/product', productRoute_1.default);
app.use('/api/v1/cart', cartRoute_1.default);
app.use('/api/v1/order', orderRoute_1.default);
app.use('/api/v1/category', categoryRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=index.js.map