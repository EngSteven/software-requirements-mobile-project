import express from 'express'
import usersRoutes from "./routes/users.routes.js"; 
import projectsRoutes from './routes/projects.routes.js'
import forumsRoutes from './routes/forums.routes.js'

import cors from 'cors'

const app = express();

app.use(cors({
    origin: '*', // o '*' para permitir cualquier origen, aunque es menos seguro
    methods: 'GET,POST,PUT,DELETE',  // Métodos permitidos
    credentials: true                // Habilitar si se necesitan cookies en la solicitud
})); 
app.use(express.json());
app.use(usersRoutes);
app.use(projectsRoutes);
app.use(forumsRoutes);
 
app.listen(3001)
console.log("Servidor iniciado")  