import User, {IUser} from "../models/user";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {logger} from "../logger";

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export const authService = {


    /**
     * Sign up with given data
     * @param data New user data
     * @return Token and user data
     */
    signup: async (data: IUser) => {

        logger.debug("Sign up in the BLL layer.");

        const user: any = await User.findOne({
            email: data.email,
        });

        if (user)
            throw new Error("User exist with this email.");

        if (user?.username === data.username)
            throw new Error("User exist with this username.");


        const newUser = new User({
            email: data.email,
            username: data.username,
            password: await hashPassword(data.password)
        });

        logger.debug(`NewUser id=${newUser._id}`)

        const savedUser = await newUser.save();
        logger.debug(`New user created successfully. _id=${savedUser._id}, email=${savedUser.email}`);

        const token = jwt.sign(
            {
                userId: savedUser._id,
                email: savedUser.email
            },
            process.env.TOKEN_SECRET || "",
            {
                expiresIn: "1h"
            }
        );

        return {
            token: token,
            userData:{
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        }


    },

    /**
     * Sign in with given credentials
     * @param data Sign in data
     * @return Token and user data
     */
    signin: async (data: any) => {

        logger.debug("Sign in in the BLL layer.");

        const {email, password} = data;
        logger.debug(`Email: ${email}`);


        if (!email || !password)
            throw new Error("Invalid credentials.");


        const user = await User.findOne({
            email: data.email,
        });
        logger.debug(`User: _id=${user?._id}, username=${user?.username}`);

        if (!user)
            throw new Error("User not found!");

        const compareResult = await comparePassword(data.password, user.password);
        if (!compareResult)
            throw new Error("Password does not match.");

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.TOKEN_SECRET || "",
            {
                expiresIn: "1h"
            }
        );

        return {
            token: token,
            userData: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        };


    },


}