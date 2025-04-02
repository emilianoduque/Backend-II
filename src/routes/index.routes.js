import {Router} from "express";
import cartsRouter from "./carts.routes.js";
import productRouter from "./products.routes.js";
import sessionsRouter from "./sessions.routes.js";
import usersRouter from "./users.routes.js";

const indexRouter = Router()

indexRouter.use("/api/users", usersRouter);
indexRouter.use("/api/sessions", sessionsRouter);
indexRouter.use("/api/carts", cartsRouter);
indexRouter.use("/api/products", productRouter);
indexRouter.get("/login", (req,res) => {
    res.render("templates/login", {title: "Login", url_css: "/css/style.css", url_js:"/js/login.js"});
});
indexRouter.get("/register", (req,res) => {
    res.render("templates/register", {title: "Register", url_css: "/css/style.css", url_js:"/js/register.js"});
});
indexRouter.use("*", (req,res) => {
    res.status(404).send("Ruta no encontrada");
});

export default indexRouter;