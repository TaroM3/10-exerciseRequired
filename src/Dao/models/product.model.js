// import mongoose from "mongoose";
const mongoose = require('mongoose')

const  productSchema = mongoose.Schema({
    // id: Number,
    title: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: Array
})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel