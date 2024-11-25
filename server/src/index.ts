



import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import {connect} from "./db";
import apiRouter from "./apiRouter";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const port = process.env.PORT || 3156;


connect();

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}));

app.use(cookieParser())

app.use(bodyParser.json())
app.use("/api", apiRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});