import express from "express";
import registerClientController from "../controller/RegisterClientController.js";
const router = express.Router();

router.route("/").post(registerClientController.register);
router.route("/verifyCodeEmail").post(registerClientController.verifyCode)

export default router;