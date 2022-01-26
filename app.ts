import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {clientRouter} from "./routes/clientRoutes";
import cors from 'cors'

const app = express();
app.use(cors())
dotenv.config();

app.use(bodyParser.json());
app.use("/clients", clientRouter);

app.listen(process.env.PORT, () => {
    console.log(`Node server started running on ${process.env.PORT}`);
});