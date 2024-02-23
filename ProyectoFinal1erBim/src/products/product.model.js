import mongoose, { Schema } from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'category'
    }
    
    },{
        versionKey: false
    }

)

export default mongoose.model('product', productSchema) 

