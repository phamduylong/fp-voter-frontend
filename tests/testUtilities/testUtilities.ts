import * as bcrypt from "bcrypt";
import User from "./User";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectToDB = async ():Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('MONGODB_URI is not defined in the .env file.');
            return;
        }
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};
await connectToDB();
export const createTestUser = async (): Promise<void> => {
    const username: string = "backendUnitTest";
    let password: string = "unitTest#0001";
    const id: number = 1234;
    const salt: string = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const newUser = new User({
        username: username,
        password: password,
        id: 1234,
        isAdmin: false,
    });

    await newUser.save();

};

export const deleteTestUser = async (): Promise<void> => {
    await User.findOneAndRemove({ username: "backendUnitTest" });
};


