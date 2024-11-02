import express, { json, response } from 'express';
import { CategoryMod } from '../Models/CategoryModel.js';
import { ProductMod } from '../Models/ProductModel.js';
import { AWS_BUCKET_NAME } from '../config.js';
import { AWS_ACCESS_KEY_ID } from '../config.js'
import { AWS_SECRET_ACCESS_KEY } from '../config.js';
import AWS from 'aws-sdk';

import multer from 'multer';
import multerS3 from 'multer-s3';
import bodyParser from 'body-parser';
import { log } from 'console';
// import { Context } from '../../client/src/utils/context.js';
// 
// import pkg from '../../client/src/utils/context.js';
// const { Context } = pkg;


const app = express();
app.use(bodyParser.json());

const productRouter = express.Router();

productRouter.post('/product', async (req,res) => {
    
    try {         
        console.log("Request Body:", req.body);  // Add this line  
        const {title, desc, cover, price, category} = req.body;
        const  newProduct = {
            title,
            cover,
            desc,
            price,
            category,
        }
        console.log("newProduct Success : ", newProduct);
        
        const postProduct = await ProductMod.create(newProduct);

        return res.status(200).send(postProduct)

    } catch (error) {
        console.log("Error occured in product route line 96");
        
        console.log(error.message);        
        response.status(500).send({message: error.message})
    }
    
})

productRouter.get('/product', async (req,res) => {

    try {

        const Products = await ProductMod.find({});
                        
        return res.status(200).json({
            count: Products.length,
            data: Products

        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})  

productRouter.get('/product/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await ProductMod.findById(id);
        return res.status(200).json(product) 

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

productRouter.put('/product/:id', async(req,res) => {
    console.log('put found')

    try {
        const { id } = req.params;
        const {title,cover, desc, price, category} = req.body;
        console.log('title and id found')

        const  newProduct = {
            title,
            cover,
            desc,
            price,
            category
        }
        console.log('prod created')

        const product = await ProductMod.findByIdAndUpdate(id, newProduct);
        console.log('product found')

        if (!product) {
            return res.status(500).json({message: "Book not found"})
        }
        return res.status(200).json({category})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

productRouter.delete('/product/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await ProductMod.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).json({message: "Book deleted successfully!"})

    } catch (error) {
        console.log(error);
        res.status(501).send({message: error.message})
    }
})

export default productRouter;