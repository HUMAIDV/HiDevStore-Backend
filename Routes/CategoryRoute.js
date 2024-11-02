import express, { json, response } from 'express';
import { CategoryMod } from '../Models/CategoryModel.js';
import { AWS_BUCKET_NAME } from '../config.js';
import { AWS_ACCESS_KEY_ID } from '../config.js'
import { AWS_SECRET_ACCESS_KEY } from '../config.js';
import AWS from 'aws-sdk';

import fs from 'fs';
import multer from 'multer';
import multerS3 from 'multer-s3';
import bodyParser from 'body-parser';
import pkg from 'body-parser';
// const { json } = pkg;

const app = express();
app.use(bodyParser.json());

const router = express.Router();

router.post('/category', async (req,res) => {
    
    try {
        const {title, cover} = req.body;
        const  newCategory = {
            title,
            cover,
        }
        const postCategory = await CategoryMod.create(newCategory);
        return res.status(200).send(postCategory)

    } catch (error) {
        console.log(error.message);        
        response.status(500).send({message: error.message})
    }
    
})

router.get('/category', async (req,res) => {

    try {

        const Categories = await CategoryMod.find({});
                        
        return res.status(200).json({
            count: Categories.length,
            data: Categories

        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})  

router.get('/category/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const category = await CategoryMod.findById(id);
        return res.status(200).json(category) 

    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

router.put('/category/:id', async(req,res) => {
    console.log('put found')
    try {
        const { id } = req.params;
        const {title,cover} = req.body;
        console.log('title and id found')

        const  newCategory = {
            title,
            cover,
        }
        console.log('cat created')

        const category = await CategoryMod.findByIdAndUpdate(id, newCategory);
        console.log('category found')

        if (!category) {
            return res.status(500).json({message: "Book not found"})
        }
        return res.status(200).json({category})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

router.delete('/category/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const category = await CategoryMod.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).json({message: "Book deleted successfully!"})

    } catch (error) {
        console.log(error);
        res.status(501).send({message: error.message})
    }
})

export default router;