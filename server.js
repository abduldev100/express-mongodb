import dotenv from "dotenv";
import express from "express";
import nunjucks from "nunjucks";
import cors from "cors";
import session from "express-session"
import MongoStore from "connect-mongo"
import { join } from "path";
import ConnectDatabase from "./settings/database.js"
import User from "./routes/api/User.js"
import Blog from "./routes/api/Blog.js"
import Category from "./routes/api/Category.js";
import Auth from "./routes/api/Auth.js";
import Pages from "./routes/index.js";
import { LoggedIn } from "./middlewares/SessionAuth.js"

// ENV PROPS
dotenv.config()

// APP INIT 
const app = express()

// DYNAMIC PORT
const PORT = process.env.PORT

// DATABASE CONNECTION
ConnectDatabase()

// CORS POLICY
app.use(cors())

// API
app.use(express.json())

// FORM DATA BUFFERING
app.use(express.urlencoded({ extended: false }))

// SESSION STORAGE
app.set("trust proxy", 1)
app.use(session({
    name: process.env.Name,
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: false,
        maxAge: 30 * 30000,
    },
    rolling: true,
    store: new MongoStore({
        mongoUrl: process.env.DATABASE_URL,
        dbName: process.env.DATABASE,
        collectionName: "sessions",
        ttl: 14 * 24 * 60 * 60,
        autoRemove: "native"
    })
}))


// PAGES FOLDER
app.set("views", "pages")

// PAGES TEMPLATE ENGINE
app.set("view engine", "html")

nunjucks.configure("pages/", {
    autoescape: false,
    express: app,
    watch: true
})

// ASSETS FOLDER
app.use("/static", express.static(join(process.cwd(), "src")));

// ROUTES
app.use("/", LoggedIn)
app.use("/", Pages)
app.use("/api", User)
app.use("/api", Blog)
app.use("/api", Category)
app.use("/api", Auth)


// START APP
app.listen(PORT, () => {
    console.log("Listening at : http://localhost:" + PORT + "/")
});
