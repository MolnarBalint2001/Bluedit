import express from "express";
import {AuthenticatedRequest, authenticateToken} from "../middlewares/authenticationToken";
import {badRequest, ok} from "../helpers/responseHelper";
import {logger} from "../logger";
import {commentService} from "../services/commentService";

const router = express.Router();

router.get("/", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        const postId:any = req.query.postId;
        logger.debug(`Get comments in the API layer. postId=${postId}`);
        const comments = await commentService.findComments(postId);
        ok(res,comments);
    }
    catch (e){
        badRequest(res, e);
    }
});


router.post("/", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
       const data = req.body;
       const {user} = req;
       logger.debug("Create comment in the API layer.");
       const savedComment = await commentService.createComment(data, user);
       ok(res, savedComment);

   }
   catch (e){
       badRequest(res, e);
   }
});


router.delete("/:id", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{

       const commentId = req.params.id;
       logger.debug(`Delete comment in the API layer. id=${commentId}`);
       const deletedId = await commentService.deleteComment(commentId);
       ok(res, deletedId);
   }
   catch (e){
       badRequest(res, e);
   }

});







export default router