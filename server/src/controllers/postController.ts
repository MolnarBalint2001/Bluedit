import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import {AuthenticatedRequest, authenticateToken} from "../middlewares/authenticationToken";
import {logger} from "../logger";
import {postService} from "../services/postService";
import post from "../models/post";


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

router.get("/statistics", async (req, res)=>{
    try{
        logger.debug("Get post statistics in the API layer.");
        const statistics = await postService.getStatistics();
        ok(res, statistics)
    }
    catch (e){
        badRequest(res, e);
    }
});



router.get("/:id", async (req:AuthenticatedRequest, res)=>{
    try{
        const id = req.params.id;
        logger.debug(`Get post in the API layer. id=${id}`);
        const post = await postService.findById(id);
        ok(res, post);
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


router.put("/", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        const data = req.body;
        logger.debug(`Create post in the API layer. title=${data.title} contentLength=${data.content.length}`);
        const updatedPost = await postService.updatePost(data);
        ok(res, updatedPost);
    }
    catch (e){
        badRequest(res,e);
    }

});

router.delete("/:id", authenticateToken, async (req,res)=>{
    try{
        const id = req.params.id;
        logger.debug(`Delete post in the API layer. id=${id}`);
        const deletedPostId = await postService.deletePost(id);
        ok(res, deletedPostId);
    }
    catch (e){
        badRequest(res,e);
    }

});


router.put("/likes", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
       const postId = req.query.postId;
       const {user} = req;
       logger.debug(`Like in the API layer. postId=${postId}`);

       const result = await postService.like(postId, user);
       ok(res, result);
   }
   catch (e){
        badRequest(res, e);
   }
});


router.get("/likes/:postId", authenticateToken, async (req,res)=>{
   try{
       const postId = req.params.postId;
       logger.debug(`Get likes to a post in the API layer. postId=${postId}`)
       const likes = await postService.findLikes(postId);

       ok(res, likes);
   }
   catch (e){
       badRequest(res, e);
   }
});



router.post("/superlikes", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        const postId:any = req.query.postId;
        const {user} = req;
        logger.debug(`Superlike in the API layer. postId=${postId}`);

        const result = await postService.superlike(postId, user);
        ok(res, result);
    }
    catch (e){
        badRequest(res, e);
    }
});


router.get("/superlikes/:postId", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        const postId = req.params.postId;
        logger.debug(`Get superlikes to a post in the API layer. postId=${postId}`)
        const superlikes = await postService.findSuperlikes(postId);

        ok(res, superlikes);
    }
    catch (e){
        badRequest(res, e);
    }
});



router.get("/account-posts/:accountId", authenticateToken, async (req, res)=>{
    try{
        const acocuntId = req.params.accountId;
        logger.debug(`Get posts by accountId in the API layer. accountId=${acocuntId}`);
        const posts = await postService.findPostsByAccount(acocuntId);
        ok(res, posts);
    }
    catch (e){
        badRequest(res, e);
    }
})









export default router;
