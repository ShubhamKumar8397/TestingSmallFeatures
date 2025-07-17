import asyncHandler from "express-async-handler"
import { oauth2Client } from "../Utils/google.Config.js";
import axios from "axios"
import { google } from "googleapis";



const YOUR_CLIENT_ID = process.env.YOUR_CLIENT_ID
const YOUR_CLIENT_SECRET = process.env.YOUR_CLIENT_SECRET

const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    'http://localhost:5173'
)


const googleLogin = asyncHandler(async (req, res) => {

    const { code } = req.body;
    const googleToken = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleToken.tokens);
    try {
        // Use try Catch This Because External Api Call
        const userData = await axios.get
        (`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleToken.tokens.access_token}`)
        console.log(userData)
    } catch (error) {
        console.log("ERRR :::", error)
    }

})

export { googleLogin }