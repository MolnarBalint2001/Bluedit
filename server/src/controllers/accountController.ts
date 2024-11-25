import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import authenticateToken, {AuthenticatedRequest} from "../middlewares/authenticationToken";
import {logger} from "../logger";
import {accountService} from "../services/accountService";


const router = express.Router();




router.get("/:id", authenticateToken, async (req,res)=>{
   try{
       const id = req.params.id;
       logger.debug(`Get account information in the API layer. id=${id}`);

       const account = await accountService.findUserById(id);

       ok(res, account)

   }
   catch (e){
       badRequest(res, e)
   }
});


router.post("/upload-image", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{
        const data = req.body;
        const {user} = req;
        logger.debug("Upload profile image in the API layer. ")
        const uploaded = await accountService.uploadImage(data, user);
        return ok(res, uploaded);
    }
    catch (e){
        badRequest(res, e);
    }
})





export  default router;