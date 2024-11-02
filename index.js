import express from 'express';
import mongoose from 'mongoose';
import { PORT } from './config.js';
import { MongoDBUrl } from './config.js';
// const {MongoDBUrl} = process.env;
import cors from 'cors'
import { CategoryMod } from './Models/CategoryModel.js';
import router from './Routes/CategoryRoute.js';
import productRouter from './Routes/ProductRoute.js';
import cartRouter from './Routes/CartRoute.js';
import paymentRouter from './Routes/PaymentRoute.js';
import kindeRouter from './Routes/KindeRoute.js';
import dotenv from 'dotenv';
dotenv.config();
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// --------------------------------------------------------------------------------------->

const app = express();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
// app.use(cors(corsOptions));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/posts", router)
app.use("/posts", productRouter)
app.use("/posts", cartRouter)
app.use("/api", paymentRouter)
app.use("/", kindeRouter)

// MongoDB Connection

mongoose
    .connect(MongoDBUrl)
    .then(() => {
        console.log("App connected to database")
    })
    .catch((error) => {
        console.log(error)
    });
// --------------------------------------------------------------------------------------->


// Endpoint

app.get('/', (req,res) => {
    return res.status(200).send("Welcome to HIDevStore Server")
})


// --------------------------------------------------------------------------------------->

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});