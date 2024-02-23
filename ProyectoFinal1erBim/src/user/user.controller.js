import User from './user.model.js'

import {    encrypt, 
    checkPassword, checkUpdateUser 
    
} from '../utils/validator.js'

import { generateJwt } from '../utils/jwt.js'


export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save() //Guardar en la BD
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) //buscar un solo registro
        //Verifico que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Generar el Token
            let token = await generateJwt(loggedUser)
            //Respondo al usuario
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`, 
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const updateUser = async(req, res) =>{
    try {
        let { id } = req.params
        //Datos para actualizar
        let data = req.body
        //validar si trae datos
        let update = checkUpdateUser(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        //Actualizar la BD
        let updateUser = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        //Validar que se actualizo
        if(!updateUser) return res.status(401).send({message: 'User not found and not updated'})
        //Respondo al user
        return res.send({message: 'Updated user'. updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})        
        return res.status(500).send({message: 'Error updating account'})
    }
}



export const deleteUser = async(req, res)=>{
    try{
        //Obtener el Id
        let { id } = req.params
        
        //Eliminar (deleteOne (solo elimina no devuelve el documento) / findOneAndDelete (Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({_id: id}) 
        //Verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`}) //status 200
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}