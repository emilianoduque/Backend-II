import cartModel from "../models/carts.models.js";

export const getCart = async(req,res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart)
            return res.status(200).send(cart);
        else
            return res.status(404).send("Carrito no existe")
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createCart = async(req,res) => {
    try {
        await cartModel.create({products: []});
        res.status(201).send("Carrito creado correctamente");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const insertProductCart = async(req,res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const {quantity} = req.body;

        const cart = await cartModel.findOne({_id: cartId});

        if(cart){
            const index = cart.products.findIndex(prod => prod._id == productId);

            if(index != -1)
                cart.products[index].quantity = quantity;
            else
                cart.products.push({id_prod: productId, quantity: quantity});
            await cartModel.findByIdAndUpdate(cartId, cart);
            return res.status(200).send("Carrito actualizado correctamente");
        } else {
            return res.status(404).send("Carrito no existe");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProductCart = async(req,res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartModel.findOne({_id: cartId});

        if(cart){
            const index = cart.products.findIndex(prod => prod.id == productId)
            
            if(index != -1){
                cart.products.splice(index,1);
                cart.save();
                return res.status(200).send("Producto eliminado correctamente");
            } else {
                return res.status(404).send("Producto no existe");
            }
        } else {
            return res.status(404).send("Carrito no existe");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteCart = async(req,res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart){
            cart.product = [];
            cart.save();
            return res.status(200).send("Todos los productos del carrito han sido eliminados");
        } else {
            return res.status(404).send("Carrito no existe");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}