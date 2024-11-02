import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
       
        title : {
            type: String,
            required: true,
        },
        cover : {
            type: Array,
            required: true,
        },
        desc : {
            type: String,
            required: true,
        },
        price : {
            type: Number,
            required: true,
        },
        category : {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps : true
    }
)

export const ProductMod = mongoose.model('product', ProductSchema)