import productModel from "../models/products.models.js";

export const getProducts = async (req, res) => {
    try {
        const { limit, page, metFilter, filter, metOrder, ord } = req.query;

        const pag = page !== undefined ? page : 1;
        const limi = limit !== undefined && limit !== null ? limit : 10;

        const filQuery = metFilter !== undefined ? { [metFilter]: filter } : {};
        const ordQuery = metOrder !== undefined && ord !== undefined ? { [metOrder]: ord } : {};

        const prods = await productModel.paginate(filQuery, { limit: limi, page: pag, sort: ordQuery, lean: true });

        prods.pageNumbers = Array.from({ length: prods.totalPages }, (_, id) => ({
            number: id + 1,
            isCurrent: id + 1 === prods.page
        }));

        res.status(200).send(prods);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const prod = await productModel.findById(idProd);
        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(404).send({ message: "Producto no existe" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const createProduct = async (req, res) => {
    try {
        const { title, description, category, code, price, stock } = req.body;
        if(!title || !description || !category || !code || !price || !stock){
            return res.status(400).send({message: "Faltan datos requeridos"});
        }
        const newProduct = await productModel.create({
            title, description, category, code, price, stock
        });
       
        res.status(201).send(newProduct);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send(error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const updateProduct = req.body;
        const rta = await productModel.findByIdAndUpdate(idProd, updateProduct);
        if (rta) {
            res.status(200).send({ message: "Producto actualizado correctamente" });
        } else {
            res.status(404).send({ message: "Producto no existe" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const idProd = req.params.pid;
        const rta = await productModel.findByIdAndDelete(idProd);
        if (rta) {
            res.status(200).send({ message: "Producto eliminado correctamente" });
        } else {
            res.status(404).send({ message: "Producto no existe" });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};
