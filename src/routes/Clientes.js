import express from "express"
import clientController from "../controller/ClientesController.js"

const router = express.Router();

router.route("/")
.get(clientController.getClients);

router.route("/id")
.put(clientController.updateClient)
.delete(clientController.deleteClient)

export default router;