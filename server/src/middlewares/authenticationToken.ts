
import express, {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";
import {logger} from "../logger";


export interface AuthenticatedRequest extends Request {
    user?: {
        userId:string
        email:string
    }
}

export interface JwtPayload {
    userId: string;
    email: string;
}


export const authenticateToken = (req:AuthenticatedRequest, res:Response, next:NextFunction):void | Promise<void> => {
    const token = req.cookies["AUTH_TOKEN"]


    if (!token){
        res.sendStatus(401);
        return;
    }


    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);

        req.user = decoded as JwtPayload;
        next();
    })
}


export default authenticateToken;