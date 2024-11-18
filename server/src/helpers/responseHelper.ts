
import express, {Response} from "express";


export const ok = (res:Response, data?:any) =>{
    if (data) res.status(200).send(data);
    res.status(200);
}


export const badRequest = (res:Response, error:any) =>{
    console.log(error)
    res.status(400).send({message:""});
}



export const unAuthorized = (res:Response) =>{
    res.status(401);
}


export const forbidden = (res:Response) =>{
    res.status(403);
}