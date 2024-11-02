import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
       
        userId : {
            type: String,
        },
        items : {
            type: Array,
        },
    }, 
    {
        timestamps : true
    }
)

export const CartMod = mongoose.model('cart', CartSchema)