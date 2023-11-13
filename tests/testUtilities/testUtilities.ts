import * as bcrypt from "bcrypt";
import User from "./User";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {randomInt} from "crypto";

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
const createTestUser = async (): Promise<void> => {
    const username: string = "frontendUnitTest";
    let password: string = "unitTest#0001";
    const id: number = 1000 + randomInt(1, 1000);
    const salt: string = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const isUserExist = await User.find({username: username});
    if (isUserExist.length !== 0){
        await deleteAllTestUsers();
    }
    const newUser = new User({
        username: username,
        password: password,
        id: id,
        isAdmin: false,
    });
    await newUser.save();

};


const createTestAdmin = async (): Promise<void> => {
    const username: string = "frontendAdmin";
    let password: string = "unitTest#0001";
    const id: number = 1000 + randomInt(1, 1000);
    const salt: string = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    const isUserExist = await User.find({username: username});
    if (isUserExist.length !== 0){
        await deleteAllTestAdmins();
    }
    const newUser = new User({
        username: username,
        password: password,
        id: id,
        isAdmin: true,
    });
    await newUser.save();

};


const deleteTestUser = async (): Promise<void> => {
    await User.findOneAndRemove({ username: "frontendUnitTest" });
};

const deleteTestAdmin = async (): Promise<void> => {
    await User.findOneAndRemove({ username: "frontendAdmin" });
};

const deleteAllTestUsers = async (): Promise<void> => {
    await User.deleteMany({ username: "frontendUnitTest" });
};

const deleteAllTestAdmins = async (): Promise<void> => {
    await User.deleteMany({ username: "frontendAdmin" });
};

export { createTestUser, createTestAdmin, deleteTestUser, deleteTestAdmin, deleteAllTestUsers, deleteAllTestAdmins };
