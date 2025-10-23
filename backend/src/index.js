import express from 'express';
import dotenv from 'dotenv';
import route from './routers/index.js';
import errorHandler from './handlers/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`P-market chạy đường link: http://localhost:${PORT}`);
});