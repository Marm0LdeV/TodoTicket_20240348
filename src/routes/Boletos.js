import express from "express"
import BoletosController from "../controller/BoletosController.js";
import {validateAuthCookie} from "../middleware/Authmiddleware.js";


const router = express.Router();

router.route("/")
.get(validateAuthCookie(["Admin"]),BoletosController.getBoletos)
.post(validateAuthCookie(["Cliente"]),BoletosController.insertBoletos)

router.route("/id")
.put(validateAuthCookie(["Admin", "Cliente"]),BoletosController.updateBoletos)
.delete(validateAuthCookie(["Admin"]),BoletosController.deleteBoletos)

export default router;