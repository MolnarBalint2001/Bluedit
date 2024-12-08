import express from "express";
import {badRequest, ok} from "../helpers/responseHelper";
import authenticateToken, {AuthenticatedRequest} from "../middlewares/authenticationToken";
import {logger} from "../logger";
import {accountService} from "../services/accountService";


const router = express.Router();




router.get("/", authenticateToken, async (req, res)=>{
    try{
        logger.debug("Get accounts in the API layer.");
        const accounts = await accountService.findAccounts();
        ok(res, accounts);
    }
    catch (e){
        badRequest(res, e)
    }
});
router.get("/search", authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
       const q = req.query.query;
       logger.debug("Search accounts in the API layer. " + `query=${q}`);
       const accounts = await accountService.search(q);
       ok(res, accounts);
   }
   catch (e){
       badRequest(res, e)
   }
});


router.get("/top-accounts", authenticateToken, async (req:AuthenticatedRequest, res)=>{
    try{

        logger.debug("Top accounts in the API layer. ");
        const accounts = await accountService.topAccounts();
        ok(res, accounts);
    }
    catch (e){
        badRequest(res, e)
    }
});

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
});


router.put("/",authenticateToken, async (req:AuthenticatedRequest, res)=>{
   try{
      const data = req.body;
      const accountId = req.query.accountId;
      logger.debug(`Update account in the API layer. accountId=${accountId}`);

      //await accountService.updateAccount(accountId, data);
   }
   catch (e){
       badRequest(res,e);
   }
});





export  default router;