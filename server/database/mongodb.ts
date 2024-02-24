import mongoose from "mongoose";

mongoose.set('strictQuery', false);

/** connect to mongodb */
export const connectToMongoDB = async () => {
    try {
        const mongoConn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB running: ${mongoConn.connection.host}`)
    } catch (error) {
        console.log(error);
    }
};