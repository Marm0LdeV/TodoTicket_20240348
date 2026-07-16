import {config} from "../../config.js"
import ClientModel from "../models/Clientes.js";
import bcrypt from "bcryptjs"
import token from "jsonwebtoken"

//Array de funciones
const loginClientController = {};

loginClientController.login = async (req,res) => {
    try {
        //Solicitar datos
        const {email, password} = req.body;
        const userFound = await ClientModel.findOne({email});

        if(!userFound){
            return res.status(404).json({message: "Cliente no encontrado"});
        }

        //Validar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch){
            //Sumar intentos
            userFound.loginAttempts= (userFound.loginAttempts || 0) + 1;
        }

        //Bloquear despues de 5 intentos 
        if(userFound.loginAttempts >= 5) {
            userFound.timeOut = Date.now() + 15*60*1000;

        userFound.loginAttempts = 0;
        await userFound.save();
        return res.status(403).json({message: "Cuenta bloqueada"});
        }
        
        //Si escribe bien los datos
        //Borrar los intentos
        userFound.loginAttempts = 0;
        userFound.timeOut = null;
        await userFound.save();

        //Crear el token
        const toke = jsonwebtoken.sign(
            //#1- ¿Que vamos a guardar
            { id: userFound._id, usertype: "Client"},
            //#2- Secret key
            config.JWT.secret,
            {expiresIn: "30d"}
        );

        //Guardamos el token en una cookie
        res.cookie("authcookie", token);

        //Listo!
        return res.status(200).json({message: "Login exitoso"});    
    } catch (error) {
        console.log("error"+ error);
        return res.status(500).json({message: "Internal server error"});
    }
};

export default loginClientController;