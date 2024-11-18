import express from "express";
import {badRequest} from "../helpers/responseHelper";
import {logger} from "../logger";
import  authenticateToken, {AuthenticatedRequest} from "../middlewares/authenticationToken";


const router = express.Router();
router.post("/follow", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{

        const {user} = req;
        const followedId = req.query.followedId;


        logger.debug("Follow in the api layer.");
    }
    catch (e){
        badRequest(res, e)
    }
});


router.put("/unfollow", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
        const {user} = req;
        const followedId = req.query.followedId;
   }
   catch (e){
       badRequest(res, e)
   }
});



export default router;