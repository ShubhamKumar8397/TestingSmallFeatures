import Redis from "ioredis";

export const client = new Redis();

async function init(params) {
    try {
        const result = await client.get('user:3')
        console.log(result)

        // const setResult = await client.set("user:4", "shubham")
        // console.log("SetResult" , setResult)

        const res3 = await client.set("bike:1", "bmw", 'NX');
        console.log(res3);  // null
        console.log(await client.get("bike:1"));  // Deimos
        const res4 = await client.set("bike:1", "lawda", 'XX');
        console.log("res4" ,  res4);

        const getUser4 = await client.get("user:4"); 
        console.log(getUser4)

        const expireUser = await client.expire("user:4", 20)
        const user4 = await client.get("user:4")
        console.log(user4)
        console.log(expireUser)
    } catch (error) {
        console.log(error)
    }
}





export default init;