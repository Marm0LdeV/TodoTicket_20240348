/////// RUTAS //////









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

app.use ("/api/Clientes", );


export default app;