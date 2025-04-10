import {generateToken} from "../utils/jwt.js";
import "dotenv/config";

export const login = async(req,res) => {
    try {
        if(!req.user)
            return res.status(400).json({message: "Usuario o contraseña no válidos"});

            //Sesion de BD
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name,
            rol: req.user.rol,
        }

        //retornando token de JWT
        return res.status(200).cookie(process.env.SECRET_SESSION, generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).json({message: "Usuario logueado correctamente"});
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const register = async(req,res) => {
    try {
        if(!req.user)
            return res.status(400).json({message: "Email y contraseña son obligatorios"})

        return res.status(201).json({message: "Usuario registrado correctamente"})
    } catch (error) {
        res.status(500).json({message: error});
    }
}

export const viewRegister = (req,res) => {
    res.status(200).render("templates/register", {
        title: "Registro de usuarios",
        url_js: "/js/register.js",
    })
}

export const viewLogin = (req,res) => {
    res.status(200).render("templates/login", {
        title: "Inicio de sesion de usuarios",
        url_js: "/js/login.js",
    })
}
