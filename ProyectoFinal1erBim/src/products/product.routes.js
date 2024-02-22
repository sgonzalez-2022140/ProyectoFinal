'use strict'

import { Router } from 'express'
import {
    addProduct, getAllProducts, getAProduct, updateProduct, getNoProducts, deleteProducts
} from './product.controller.js'

const api = Router()

//Agregar productos
api.post('/addProduct', addProduct)
//Ver todo el catalogo de productos
api.get('/getAllProducts', getAllProducts)
//Encontrar 1 producto
api.get('/getAProduct/:id', getAProduct);

//actualizar producto
api.put('/updateProduct/:id', updateProduct)
//ver productos sin unidades
api.get('/getNoProducts', getNoProducts)
//Eliminar
api.delete('/deleteProducts/:id', deleteProducts)





export default api