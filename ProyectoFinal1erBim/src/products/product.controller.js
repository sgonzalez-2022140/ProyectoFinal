'use strict'

import Category from '../category/category.model.js'
import Product from './product.model.js'

export const addProduct = async(req, res) => {
    try{
        //capturar la info
        let data = req.body
        //Validar que existe una categoria
        let category = await Category.findOne({ _id: data.category})
        if(!category) return res.status(404).send({message: 'category not found'})
        //crear la instancia de producto
        let product = new Product(data)
        //guardar la info de producto
        await product.save()
        //Responder si sale bien
        return res.send({message: 'Product saved successfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error adding products'})
    }
}