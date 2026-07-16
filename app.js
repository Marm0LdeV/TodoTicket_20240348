/////// RUTAS //////

import express from "express"
import ClientesRoutes from "./src/routes/Clientes.js"
import BoletosRoutes from "./src/routes/Boletos.js"
import LoginAdminRoutes from "./src/routes/LoginAdmin.js"
import LoginClientesRoutes from "./src/routes/LoginClientes.js"
import LogoutRoutes from "./src/routes/logout.js"
import RegisterAdminRoutes from "./src/routes/RegisterAdmin.js"
import RegisterClientesRoutes from "./src/routes/RegisterClientes.js"
import WompiRoutes from "./src/routes/wompi.js"
import cookieParser from "cookie-parser"
import cors from "cors"

//Ejecutar express
const app = express ();

app.use(cors ({
    origin: ["https://localhost:5173", "https://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}))

app.use(cookieParser());

app.use(express.json()); 

///// ENDPOINTS ////

app.use ("/api/Clientes", ClientesRoutes);
app.use ("/api/Boletos", BoletosRoutes);
app.use ("/api/LoginAdmin", LoginAdminRoutes);
app.use ("/api/LoginClientes", LoginClientesRoutes);
app.use ("/api/Logout", LogoutRoutes);
app.use ("/api/RegisterAdmin", RegisterAdminRoutes);
app.use ("/api/RegisterCliente", RegisterClientesRoutes);
app.use ("/api/wompi", WompiRoutes);

export default app;