const clientController = {};
//IMPROTS
import ClientsModel from "../models/Clientes.js";

//SELECT
clientController.getClients = async (req,res) => {
    const clients = await ClientsModel.find();
    res.json(clients);
}

//UPDATE
clientController.updateClient = async (req,res) => {
    const {name, email, password,} = req.body;
    await ClientsModel.findByIdAndUpdate(
        req.params.id,
        {
                name,
                email,
                password
        },
        { new: true },
    )
    res.json({message: "Client updated"});
};

//DELETE
clientController.deleteClient = async (req,res) => {
    await ClientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted"});
};

export default clientController;