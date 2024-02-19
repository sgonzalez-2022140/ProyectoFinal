import express from 'express'
import { test, saveCategory} from "./category.controller.js"

const api = express.Router();

//Rutas de declaraciones
api.get('/test', test)
api.post('/saveCategory', saveCategory)

export default api