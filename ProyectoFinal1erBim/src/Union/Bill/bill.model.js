import mongoose, { Schema } from "mongoose"

const billSchema = mongoose.Schema({
    nit: {
        type: String,
        require: true,
    },
    name: {
        type: moongose.Schema.String,
        ref: 'user'
    }
})