import {Router} from "express";
import {getProducts, getProduct, createProduct, updateProduct, deleteProduct} from "../controllers/product.controllers.js"
import {authorization} from "../config/authorization.js";
import passport from "passport";

const productRouter = Router();

productRouter.get("/", passport.authenticate("jwt"), getProducts);
productRouter.get("/:pid", passport.authenticate("jwt"), getProduct);
productRouter.post("/", passport.authenticate("jwt"), authorization("Admin"), createProduct);
productRouter.put("/:pid", passport.authenticate("jwt"), authorization("Admin"), updateProduct);
productRouter.delete("/:pid", passport.authenticate("jwt"), authorization("Admin"), deleteProduct);

export default productRouter;