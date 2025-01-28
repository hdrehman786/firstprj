import express from 'express';
import { configDotenv } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './db/database.js';
import router from './routes/todoroute.js';

configDotenv();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));
const port = process.env.PORT || 8000;


connectDB();

app.use("/todo",router);


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})
