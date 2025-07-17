import z from "zod";


// request data validate by zod 

export const registerDataValidator = z.object({
    name: z
    .string()
    .trim()
    .min(3, {message : "Name Must Be at least 3 character long ."})
    .max(40, {message : "Name Must be Less Than 40 Characters "}),

    email: z
        .string()
        .trim()
        .email({message : "Please Enter a Valid email Adress"}),

    password: z
    .string()
    .trim()
    .min(6, {message : "Password Must Be Atleast 6 character Long "}),
    
})