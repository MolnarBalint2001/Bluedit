


import express, {Request, Response} from "express";
import {authService} from "../services/authService";
import {badRequest, ok} from "../helpers/responseHelper";
import {logger} from "../logger";

const router = express.Router();

/**
 * API - Sign in with given credentials
 *
 */
router.post("/signin", async (req:Request, res:Response)=>{
    try{
        logger.debug("Sign in in the API layer.");
        const data = req.body;

        const {token, userData} = await authService.signin(data);
        logger.debug(JSON.stringify(userData));
        res.cookie("AUTH_TOKEN", token, {
            httpOnly:false,
            maxAge: 60 * 60 * 60,
            sameSite:"lax"
        });
        ok(res, userData);
    }
    catch (e){
        res.status(400).send({message:"Invalid credentials."})
    }
});

/**
 * API - Sign up with given data
 */
router.post("/signup", async (req:Request, res:Response)=>{
    try{
        logger.debug("Sign up in the API layer.");
        const data = req.body;

        const {token, userData} = await authService.signup(data);
        res.cookie("AUTH_TOKEN", token, {
            httpOnly:false,
            maxAge: 60 * 60 * 60,
            sameSite:"lax"
        });
        ok(res, userData);
    }
    catch (e){
        badRequest(res, e);
    }
})




export default router;