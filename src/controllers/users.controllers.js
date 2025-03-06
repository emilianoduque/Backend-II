import userModel from "../models/users.models.js";

export const getUsers = async (req,res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getUser = async (req,res) => {
    try {
        const userId = req.params.uid;
        
        const user = await userModel.findById(userId);
        if(user){
            res.status(200).send(user);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateUser = async (req,res) => {
    try {
        const {first_name, last_name, email, password, age} = req.body;
        const userId = req.params.uid;
        let message = await userModel.findByIdAndUpdate(userId, {first_name, last_name, email, password, age});
        if(message){
            res.status(200).send(`Usuario actualizado con el id ${message?._id}`)
        } else {
            res.status(404).send("Usuario no existe");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteUser = async (req,res) => {
    try {
        const userId = req.params.uid;
        let message = await userModel.findByIdAndDelete(userId);
        if(message){
            res.status(200).send(`Usuario eliminado con el id ${message?._id}`);
        } else {
            res.status(404).send("Usuario no existe");
        }
    } catch (error) {
        if(error?.message.includes("Cast to ObjectId failed for value"))
            res.status(400).send("Error al eliminar usuario debido a que el id enviado no contiene la estructura correcta");
        else 
            res.status(500).send(error);
    }
}

export const createUser = async (req,res) => {
    try {
        const {first_name, last_name, email, password, age} = req.body;
        let message = await userModel.create({first_name, last_name, email, password, age});
        res.status(201).send(`Usuario creado con el id ${message?._id}`)
    } catch (error) {
        res.status(500).send(error)
    }
}