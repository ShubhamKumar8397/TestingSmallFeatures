import app from "./app.js";
import connectDB from "./src/ConnectDB/connectDb.js";
import dotenv from "dotenv"

dotenv.config({
    path : './.env',
})



connectDB()
.then(() => {
    app.listen(8000, () => {
        console.log("App is Listening At Port 8000 ")
    })
})
.catch((err)  => {
    console.log(err)
})
