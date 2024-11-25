import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import {AuthenticatedRequest, authenticateToken} from "../middlewares/authenticationToken";
import {logger} from "../logger";
import {postService} from "../services/postService";


const router = express.Router();



router.get("/",  authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        logger.debug("Get posts in the API layer.");
        const {user} = req;
        const posts = await postService.findActives(user);

        ok(res, posts);
    }
    catch (e){
        badRequest(res,e);
    }
});


router.get("/:id", async (req:AuthenticatedRequest, res)=>{
    try{
        const id = req.params.id;
        logger.debug(`Get post in the API layer. id=${id}`);

    }
    catch (e){
        badRequest(res,e);
    }
});

router.post("/", authenticateToken, async (req:AuthenticatedRequest,res)=>{
    try{
        const data = req.body;
        const {user} = req;
        logger.debug(`Create post in the API layer. title=${data.title} contentLength=${data.content.length}`);

        const savedPost = await postService.createPost(data, user);

        return ok(res, savedPost);
    }
    catch (e){
        badRequest(res,e);
    }
});


router.put("/", authenticateToken, (req:AuthenticatedRequest, res)=>{
    try{
        const data = req.body;
        logger.debug(`Create post in the API layer. title=${data.title} contentLength=${data.content.length}`);
    }
    catch (e){
        badRequest(res,e);
    }

});

router.delete("/:id", authenticateToken, async (req,res)=>{
    try{
        const id = req.params.id;
        logger.debug(`Delete post in the API layer. id=${id}`);
    }
    catch (e){
        badRequest(res,e);
    }

});



export default router;
