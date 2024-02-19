'use strict'

import Category from "./category.model.js"

export const test = (req, res) =>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const saveCategory = async(req, res)=>{
    try{
        //capturar info
        let data = req.body
        //Guardar en la BD
        let category = new Category(data)
        await category.save()
        //Mensaje para confirmar
        return res.send({message: `You save successfully a category and the name is ${category.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to add category'})
    }
}