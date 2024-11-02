import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
       
        title : {
            type: String,
        },
        cover : {
            type: Array,
        },
    }, 
    {
        timestamps : true
    }
)

export const CategoryMod = mongoose.model('category', CategorySchema)