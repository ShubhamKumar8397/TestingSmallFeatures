import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware} from "./src/middlewares/error.middleware.js";
import axios from "axios";
import { client } from "./client.redis.js";
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

app.get('/cache', async (req, res) => {

   try {
     const cacheValue = await client.get('todos');
    if(cacheValue) return res.json({message : "todos", data : JSON.parse(cacheValue)})

    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    
    await client.set('todos', JSON.stringify(response.data))
    await client.expire('todos', 50)

    return res.status(200).json(
        {
            message : "Data Fetch Successfully",
            data : response.data 
        }
    )
   } catch (error) {
    console.log(error)
   }
})

app.use(errorMiddleware)

export default app;