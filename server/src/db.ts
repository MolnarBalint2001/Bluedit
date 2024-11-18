
import * as mongoose from "mongoose";


/**
 * MongoDB
 * Initializing database connection
 */
export const connect = () => {
    mongoose.connect("mongodb+srv://admin:Password1234@blueditcluster.rlp6j.mongodb.net/?retryWrites=true&w=majority&appName=BlueditCluster")
        .then(() => console.log("Database connected successfully!"))
        .catch((e)=>console.error(e))
}



