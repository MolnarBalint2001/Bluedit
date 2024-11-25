import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import {logger} from "../logger";
import  authenticateToken, {AuthenticatedRequest} from "../middlewares/authenticationToken";
import {followService} from "../services/followService";


const router = express.Router();


router.get("/", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{

        const {user} = req;
        logger.debug(`Follow in the api layer. userId=${user?.userId}`);

        const followers = await followService.findFollowersByUser(user);
        ok(res, followers)
    }
    catch (e){
        badRequest(res, e)
    }
});


router.post("/", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{

        const {user} = req;
        const followedId = req.query.followedId;


        logger.debug("Follow in the api layer.");

        const follow = await followService.follow(followedId,user);
        ok(res, follow);
    }
    catch (e){
        badRequest(res, e)
    }
});


router.put("/unfollow", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
        const {user} = req;
        const followedId = req.query.followedId;

        const follow = await followService.unfollow(followedId, user);
        ok(res, follow);
   }
   catch (e){
       badRequest(res, e)
   }
});





export default router;