


import express from "express";
import authController from "./controllers/authController";
import followController from "./controllers/followController";
import accountController from "./controllers/accountController";
import postController from "./controllers/postController";

const router = express.Router();

router.use("/auth", authController);
router.use("/follow", followController);
router.use("/account", accountController)
router.use("/posts", postController);


export default router;