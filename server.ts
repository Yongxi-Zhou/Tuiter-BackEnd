/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
// A4
import express, { Request, Response } from 'express';
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import SessionController from "./controllers/SessionController";
import AuthenticationController from "./controllers/AuthenticationController";
import mongoose from "mongoose";
import GroupController from "./controllers/GroupController";
import DislikeController from './controllers/DislikeController';
const cors = require("cors");
const session = require("express-session");

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.m8jeh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
// const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;// connect to the database
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;// connect to the database
const dbUrl = "mongodb+srv://yongxi:123zhou@tuiter.87xcz.mongodb.net/tuiter?retryWrites=true&w=majority";
// connect to the database
mongoose.connect(dbUrl).then(() => {
    console.log("connect successfully!!");
});


const app = express();
app.use(cors({
    credentials: true,
    // origin: [/localhost:3000$/, /practical-goldberg-69c640\.netlify\.app$/, /resilient-chebakia-929800\.netlify\.app$/]
    // origin: "http://localhost:3000"
    // origin: "https://resilient-chebakia-929800.netlify.app"
    origin: process.env.CORS_ORIGIN
}));

const SECRET = 'process.env.SECRET';
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    // sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const dislikeController = DislikeController.getInstance(app)
SessionController(app);
AuthenticationController(app);
GroupController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);