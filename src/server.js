import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
import passport from "passport";
import initializatePassword from "./config/passport.js";
import indexRouter from "./routes/index.routes.js";
import __dirname from "./path.js";
import { create } from "express-handlebars";

const app = express();
const PORT = 3000;
const hbs =  create({
    layoutsDir: path.join(__dirname, "views", "layouts"), //use esta config porque no me funcionaba solo
    partialsDir: path.join(__dirname, "views", "partials")
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("BD conectada"))
.catch((error) => console.log(error))

initializatePassword()
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
    console.log("Server on port ", PORT);
})