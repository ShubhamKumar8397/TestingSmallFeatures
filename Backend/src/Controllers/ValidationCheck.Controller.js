import asyncHandler from "express-async-handler"
import { registerDataValidator } from "../Utils/Validator.js";
import ApiError from "../Utils/ApiError.js";
import { User } from "../Schema/user.schema.js";
import { generateSixDigitCode } from "../Utils/BasicFunctions/function.js";
import jwt from "jsonwebtoken"
import { sendMail } from "../Utils/mailFacility.js";

const registerUser = asyncHandler(async (req, res, next) => {

    const { data, error } = registerDataValidator.safeParse(req.body);

    if (error) {
        // ❗ Clean and readable format
        const fieldErrors = error.flatten().fieldErrors;

        const firstField = Object.values(fieldErrors)[0];

        // if we use as keys
        // const firstField = Object.keys(fieldErrors)[0];
        // const firstMessage = fieldErrors[firstField]?.[0] || "Validation failed";

        console.log(fieldErrors)
        throw new ApiError(400, firstField, fieldErrors);
    }

    const otpToken = generateSixDigitCode();

    const user = await User.create({
        name : data.name,
        email : data.email,
        password : data.password,
        otp:otpToken
    })
    

    if(!user){
        throw new ApiError(502, "User Not Created")
    }

    const refreshToken = jwt.sign(
        {
        _id : user._id
        },
        'ajlkdjafkljdklfjaklfdjaklfjkladjfd',
        {
            expiresIn : 5 *60
        }
    );

    sendMail(user.email, otpToken)

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie('refreshToken', refreshToken, options)
    .json({
        message : "User Temporary Stored In Database",
        user
    })
    
})

const verifyEmail = asyncHandler(async(req, res, next) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken
    const {otp} = req.body
    if(!refreshToken){
        throw new ApiError(401, "You Have Not Entered Any Details")
    }
    
    if(!otp){
        throw new ApiError(401, "Otp Not Received")
    }

    const userId = jwt.verify(refreshToken,  'ajlkdjafkljdklfjaklfdjaklfjkladjfd')
    if(!userId){
        throw new ApiError(403, "Refresh Token Expired")
    }

    const user = await User.findById(userId._id);
    if(!user){
        throw new ApiError(404, "User Never Registered ..")
    }

    if(user.otp == otp){
        return res.status(200).json(
            { 
                message : "Email Verified Successfully : ",
            }

        )
    }else{
        throw new ApiError(401, "Otp Wrong ")
    }

})

export { registerUser, verifyEmail }
