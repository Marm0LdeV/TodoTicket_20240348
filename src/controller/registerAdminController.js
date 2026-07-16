import AdminModel from "../models/Administrador.js";
import { config } from "../../config.js"

//CREO UN ARRAY DE FUNCIONES
const registerAdminController = {};

registerAdminController.register = async (req,res) => {
    //1- Solicitar datos a registrar
    const {name,
        email,
        password,
        isVerified,
        loginAttempts,
        timeOut} = req.body;


try {
    //Verificar si el cliente ya existe
    const existAdmin = await AdminModel.findOne({email});
    if (existAdmin) {
        return res.status (400).json({message: "Admin already exist"});
    }
        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password,10);

        //generamos un código aleatorio
        const verificationcode= crypto.randomBytes(3).toString("hex")

        //generamos toke
        const tokenCode = jsonwebtoken .sign (
            //#1- ¿Que vamos a guardar
            {
                email,
                verificationcode,
                name,
                passwordHash,
                isVerified,
                loginAttempts,
                timeOut
            },
            //#2- Secret key
            config.JWT.secret,
            //¿Cuando expira?
            {expiresIn: "15m"},
        );
        res.cookie("verificationToken", tokenCode, {maxAge: 15* 60* 1000});
    //#1 ¿Quien envia el correo? 
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:config.email.user_email,
            pass:config.email.user_password,
        },
    });

    //#2 mailOptions -> ¿Quien lo recibe?
    const mailOptions = {
        from: config.email.user_email,
        to:email,
        subject: "Verificación de cuenta",
        text: "Para verificar tu cuenta, utiliza este codigo" + verificationCode + "expira en 15 minutos",
    };

    //#3 Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error" + error);
            return res.status(500).json({message: "error"});
        }
    });
} catch (error) {
    console.log("error" + error);
    return res.status(500).json({message: "internal server error"});
}
}

//Verificar el codigo que acabamos de mandar
registerAdminController.verifyCode = async (req, res) => {
    try {
        //#1- Solicitamos el codigo que escribieron en el frontend¿
        const {verificationCodeRequest} = req.body;

        //#2- Obtener el token de las cookies
        const token = req.cookies.verificationtoken;

        //#3- Ver que código esta en el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const{email,
                verificationcode: storedCode,
                name,
                passwordHash,
                isVerified,
                loginAttempts,
                timeOut,} = decoded;

                //Paso final: comparar el código que el usuario escribe con el codgo que esta en el token
                if(verificationCodeRequest !== storedCode) {
                    return res.status(400).json({message: "Invalid code"});
                }
                
                //Guardamos todo en la base de datos
                const newAdmin = new AdminModel({
                    name,
                    email,
                    password: passwordHash,
                    isVerified: true,
                    loginAttempts,
                    timeOut
                });

                //Guardamos todo
                await newAdmin.save();

                //si el código esta bien, entonces colocamos el campo isVerified
                const admin = await AdminModel.findOne({email});
                admin.isVerified = true;
                await admin.save();
                res.json({ message: "Email verified succesfully"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
}; 

export default registerAdminController;