


import express from "express";
import authController from "./controllers/authController";
import followController from "./controllers/followController";

const router = express.Router();

router.use("/auth", authController);
router.use("/follow", followController);



export default router;