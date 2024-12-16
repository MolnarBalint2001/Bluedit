import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import {logger} from "../logger";
import  authenticateToken, {AuthenticatedRequest} from "../middlewares/authenticationToken";
import {followService} from "../services/followService";
import {accountService} from "../services/accountService";


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

        logger.debug(`Follow in the api layer. userId=${user?.userId}, followedId=${followedId}`);

        const follow = await followService.follow(followedId,user);
        ok(res, follow);
    }
    catch (e){
        badRequest(res, e)
    }
});


router.put("/accept/:followId", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        logger.debug("Accept follow in the API layer.");
        const followId = req.params.followId;
        const accepted = await followService.acceptFollow(followId);
        ok(res, accepted);
    }
    catch (e){
        badRequest(res, e)
    }

});


router.delete("/reject/:followId", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
       logger.debug("Reject follow in the API layer.");
       const followId = req.params.followId;
       const removedId = await followService.removeFollower(followId);
       ok(res, removedId);
   }
   catch (e){
       badRequest(res, e)
   }
});






export default router;