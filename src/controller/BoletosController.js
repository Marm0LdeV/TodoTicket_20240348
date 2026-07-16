const BoletosController = {};
//IMPORTS
import boletosModel from "../models/Boletos.js";

//SELECT
BoletosController.getBoletos = async (req, res) => {
    const boletos = await boletosModel.find();
    res.json(boletos);
};

//INSERT
BoletosController.insertBoletos = async (req, res) => {
    const {customerId, quantity, purchaseDate, totalpayment, Status, transactionId} = req.body;
    const newBoletos = new boletosModel ({customerId, quantity, purchaseDate, totalpayment, Status, transactionId});
    await newBoletos.save();
    res.json({ message: "Boletos saved"})
};

//UPDATE 
BoletosController.updateBoletos = async (req, res) => {
    const {customerId, quantity, purchaseDate, totalpayment, Status, transactionId} = req.body;
    await boletosModel.findByIdAndUpdate(
        req.params.id,
        {
            customerId, quantity, purchaseDate, totalpayment, Status, transactionId
        }
    )
}

//DELETE
BoletosController.deleteBoletos = async (req,res) => {
    await boletosModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Boletos deleted"});
};

export default BoletosController;