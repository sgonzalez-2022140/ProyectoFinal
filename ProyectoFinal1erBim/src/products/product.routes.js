'use strict'

import { Router } from 'express'
import {
    addProduct
} from './product.controller.js'

const api = Router()

api.post('/addProduct', addProduct)


export default api