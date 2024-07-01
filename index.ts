import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cookieParser())
app.use(cors());
app.use(bodyParser.json());
const PORT = 8080;


// register rest api 
app.get('/api/login', (req, res) => {
    res.send('Hello World');
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

