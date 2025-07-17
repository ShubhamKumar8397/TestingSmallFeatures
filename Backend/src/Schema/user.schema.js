import mongoose, { Schema } from "mongoose"

// const userSchema = new Schema({
//     name : {
//         type : String,
//         required : true,
//         trim : true,
//     },
//     email : {
//         type : String,
//         unique : true,
//         lowercase : true,
//         trim : true,
//     },
//     otp:{
//         type :String,
//         required : true,
//     },
//     password : {
//         type : String,
//         required : true,
//         min : [6, "Minimum Password Length 6"]
//     }
// })

const userSchema = new Schema({
    token : {
        requred : true,
        type : String,
    }
})

export const User = mongoose.model("User", userSchema)