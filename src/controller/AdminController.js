const adminController = {};
//IMPROTS
import adminModel from "../models/Administrador.js";

//SELECT
adminController.getAdmin = async (req,res) => {
    const Admin = await adminModel.find();
    res.json(Admin);
}

//UPDATE
adminController.updateAdmin = async (req,res) => {
    const {name, email, password,} = req.body;
    await adminModel.findByIdAndUpdate(
        req.params.id,
        {
                name,
                email,
                password
        },
        { new: true },
    )
    res.json({message: "Admin updated"});
};

//DELETE
adminController.deleteAdmin = async (req,res) => {
    await adminModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted"});
};

export default adminController;