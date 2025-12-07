import mongoose from 'mongoose';
import User from '../src/models/User';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL= process.env.MONGODB_URI as string;

async function runSeed(){
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB!");
        const users = [
            {
                name: "John Doe",
                email: "john@example.com",
                password: "123456",
            },
            {
                name: "Alice Smith",
                email: "alice@example.com",
                password: "123456",
            },
            {
                name: "sumit maharana",
                email: "sumit@example.com",
                password: "123456",
            },
        ];

        await User.insertMany(users);
        console.log(" dummy users inserted");
    }catch(e){
        console.log("error during seed =", e);
    }finally{
        await mongoose.disconnect();
        console.log("db connection closed")
    }
}

runSeed();