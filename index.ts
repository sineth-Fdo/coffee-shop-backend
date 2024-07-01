import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
const PORT = 8080;






app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

