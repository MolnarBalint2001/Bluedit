
import express, {Request, Response, NextFunction} from "express";
import * as jwt from "jsonwebtoken";


export interface AuthenticatedRequest extends Request {
    user?: {
        userId:string
        email:string
    }
}

interface JwtPayload {
    userId: string;
    email: string;
}


export const authenticateToken = (req:AuthenticatedRequest, res:Response, next:NextFunction):void | Promise<void> => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

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