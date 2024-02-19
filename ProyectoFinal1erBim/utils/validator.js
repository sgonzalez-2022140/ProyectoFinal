//Validar diferentes datos.
'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la contraseña
export const encrypt = (password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

//Validar la contraseña
export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}

