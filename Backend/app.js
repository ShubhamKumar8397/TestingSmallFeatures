import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware} from "./src/middlewares/error.middleware.js";


const app = express();

app.use(cors({
    origin : "*"
}))

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(express.static("public"))



// routes

import temporaryRoute from "./src/Routes/temporaryRoutes.js"


app.use('/api/v1/temp', temporaryRoute)

app.use(errorMiddleware)

export default app;