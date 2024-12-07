


import express from "express";
import authController from "./controllers/authController";
import followController from "./controllers/followController";
import accountController from "./controllers/accountController";
import postController from "./controllers/postController";
import commentController from "./controllers/commentController";

const router = express.Router();

router.use("/auth", authController);
router.use("/follow", followController);
router.use("/account", accountController)
router.use("/posts", postController);
router.use("/comments", commentController);

export default router;