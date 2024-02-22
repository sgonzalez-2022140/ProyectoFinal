'use strict'

import Category from '../category/category.model.js'
import { checkUpdateProduct } from '../utils/validator.js'
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

// ------------------------- Funciones para ver los productos -------------------------
// Todos los productos en colectivo
export const getAllProducts = async(req, res) =>{
    try{
        //aqui decimos que queremos encontrar todos los productos
        let products = await Product.find()
        //retornamos la info
        return res.send({ products })
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting Products' })
    }
}
//Ver productos con valor a 0
export const getNoProducts = async(req, res)=>{
    try{
        //ver todos los productos con 0 de stock
        let outStock = await Product.findOne({stock: 0});
        if(!outStock) return res.status(404).send({message: 'Sin datos'})
        //retornamos todos los productos sin existencia
        return res.send({ outStock })
    }catch(err){
        console.error(err)
        return res.status(500).send({ message: 'Error getting Products' })

    }
}


// Productos individuales por ID
export const getAProduct = async(req, res) => {
    // Necesitamos la info de un producto individual por el parametro id
    let { id } = req.params;
    try {
        // Buscar por el id
        let product = await Product.find({_id: id})
        // Validar
        if (!product) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            return res.send({ message: 'Product found', product });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

// ---------------------------- Actualizar información del producto -------------------------
export const updateProduct = async(req, res)=>{
    try{
        //necesitamos todo el valor a actualizar
        let data = req.body
        //Lo haremos por id
        let { id } = req.params
        //validar 
        let update = checkUpdateProduct(data, false)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Actualizar
        let updateProduct = await Product.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        //validar la actualización
        if(!updateProduct) return res.status(404).send({message: 'Product not found and not updated'})
        //Responder si se pudo hacer
        return res.send({message: 'Product updated successfully', updateProduct})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to update a product'})
    }
}

// --------------------------------------- Eliminar Productos ----------------------------------------------
export const deleteProducts = async(req, res)=>{
    try{
        //le diremos que eliminemos por id
        let { id } = req.params
        //Eliminar el producto
        let deleteProduct = await Product.deleteOne({ _id: id})
        //Validar
        if(deleteProduct.deletedCount === 0)  return res.status(404).send({message: 'Product not found and not deleted'})
        //decir si esta bien
        return res.send({message: `Deleted product successfully`})
    }catch(err){
        console.error(err)
        return res.status(404).send({message: 'Error deleting product'})
    }
}

