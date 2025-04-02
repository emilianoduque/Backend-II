import passport from "passport";
import {Router} from "express";
import {login, register, viewLogin, viewRegister} from "../controllers/sessions.controllers.js"

const sessionsRouter = Router();

sessionsRouter.post("/register", passport.authenticate("register"), register);
sessionsRouter.post("/login", passport.authenticate("login"), login);
sessionsRouter.get("/current", passport.authenticate("jwt"), (req,res) => res.status(200).send(req.user));
sessionsRouter.get("/viewregister", viewRegister);
sessionsRouter.get("/viewlogin", viewLogin);

export default sessionsRouter;