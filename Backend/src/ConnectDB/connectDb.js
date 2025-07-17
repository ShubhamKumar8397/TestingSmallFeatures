import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://shubham8397:HSKD645@chattydarling.d8eoysr.mongodb.net/?retryWrites=true&w=majority&appName=Testing')
        console.log("Mongo Db Connected ::: host -" , connectionInstance.connection.host)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB;