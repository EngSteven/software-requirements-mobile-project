import {getConnection} from '../database/connection.js';
import emailService from "../services/emailService.js";
import sql from 'mssql';
import cron from 'node-cron';



export const getProyects = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {

        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjects');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};
export const getProyectsByOwner = async (req, res) => {
    const { query, userID } = req.query; // Obtiene el parámetro de consulta de la URL

    try {

        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .input("UserID", sql.Int, userID) // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByOwner');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};
 
export const getProyectsByCategory = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByCategory');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByFundingGoal = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByFundingGoal');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByCollection = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL
    console.log("getProyectsByCollection", query)

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectsByCollection');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectsByLimitDate = async (req, res) => {
    const { query } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .execute('GetActiveProjectsByLimitDate');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getUserProject = async (req, res) => {
    const { query, userID } = req.query; // Obtiene los parámetros de consulta de la URL

    try {
        const pool = await getConnection(); // Obtiene la conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID) // Agrega el parámetro de userID
            .input("SearchQuery", sql.NVarChar, query || '') // Agrega el parámetro de búsqueda
            .execute('GetActiveProject');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};

export const getUserProjectsByCategory = async (req, res) => {
    const { query, userID } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID)
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectByCategory');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getUserProjectsByFundingGoal = async (req, res) => {
    const { query, userID } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID)
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectByFundingGoal');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getUserProjectsByCollection = async (req, res) => {
    const { query, userID } = req.query; // Obtiene el parámetro de consulta de la URL
    console.log("getProyectsByCollection", query)

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID)
            .input("SearchQuery", sql.NVarChar, query || '') // Usa el parámetro de consulta de la búsqueda, o una cadena vacía si no se proporciona
            .execute('GetActiveProjectByCollection');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getUserProjectsByLimitDate = async (req, res) => {
    const { query, userID } = req.query; // Obtiene el parámetro de consulta de la URL

    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("UserID", sql.Int, userID)
            .execute('GetActiveProjectByLimitDate');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
}

export const getProyectById = async (req, res) => {
    const { projectID } = req.query; // Obtiene los parámetros de consulta de la URL

    try {
        const pool = await getConnection(); // Obtiene la conexión a la base de datos
        const result = await pool.request()
            .input("id", sql.Int, projectID) // Agrega el parámetro de userID
            .execute('GetActiveProjectById');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};

export const createProyect = async (req, res) => {
    const { titulo, descripcion, categoria, dinero, fechaHora, idUser } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        titulo == null || descripcion == null
        || categoria == null || idUser == null || dinero == null || fechaHora == null
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("ProjectName", sql.NVarChar, titulo)
            .input("ProjectDescription", sql.NVarChar, descripcion)
            .input("FundingGoal", sql.Decimal, dinero)
            .input("Category", sql.NVarChar, categoria)
            .input("OwnerID", sql.Int, idUser)
            .input("FundingDeadline", sql.DateTime, fechaHora)
            .output("FirstName", sql.NVarChar)
            .output("Email", sql.VarChar)
            .execute('InsertProject');
        let firstName = result.output.FirstName;
        let email = result.output.Email;

        // Enviar correo de registro de project
        await emailService.sendRegisterProyect({ titulo, email, firstName });

        return res.status(201).json({
            message: "project registrado exitosamente.",
            firstName,
            email,
            titulo
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    }
};


export const updateProyect = async (req, res) =>{
    const {ProjectName, ProjectDescription, FundingGoal, FundingDeadline
        , Category, idProyect} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        idProyect == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try{
        const pool = await getConnection()
    
        const result = await pool.request()
        .input("ProjectID", sql.Int, idProyect)
        .input("ProjectName", sql.NVarChar, ProjectName)
        .input("ProjectDescription", sql.NVarChar, ProjectDescription)
        .input("FundingGoal", sql.Decimal, FundingGoal)
        .input("FundingDeadline", sql.DateTime, FundingDeadline)
        .input("Category", sql.NVarChar, Category)
        .output("FirstName" , sql.NVarChar)
        .output("Email", sql.VarChar)
        .execute('updateProyect')

        let firstName  = result.output.FirstName;
        let email = result.output.Email;

        // envia correo de registro de project
        await emailService.sendUpdateProyect({ProjectName, email, firstName});
            
        return res.status(201).json({
            message: "project modificado exitosamente.",
            firstName,
            email, 
            ProjectName
        });
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};

export const deleteProyect = async (req, res) =>{
    const {id} = req.query;

    // se verifica si algun campo requerido no se ingreso
    if (
        id == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try{
        const pool = await getConnection()
        const result = await pool
        .request()
        .input("id", sql.Int, id)
        .execute('DeactivateProject')

        if(result.rowsAffected[0] === 0){
            return res.status(404).json({message: "project no encontrado"});
        }

        return res.json({message: "project eliminado correctamente"});
    }
    catch(error){        
        res.status(500);
        res.send(error.message);
    }
};

export const activeProjectsCount = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .query(
            "SELECT COUNT(*) AS ActiveProjectCount FROM Projects WHERE IsActive = 1"
        );
        
        const activeProjectCount = result.recordset[0].ActiveProjectCount;
        //res.json(result.recordset); // Envía los datos como JSON
        res.json({ activeProjectCount });
    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getActiveProjectRatings = async (req, res) => {
    const { projectID } = req.query; // Obtiene el parámetro de consulta de la URL
    
    // se verifica si algun campo requerido no se ingreso
    if (
        projectID === null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {

        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("ProjectID", sql.Int, projectID)
            .execute('GetActiveProjectRatings');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};

export const makeProjectRating = async (req, res) => {
    const { projectID, userID, comment, rating } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        projectID === null || userID === null || rating === null || (rating < 1 || rating > 5)
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("ProjectID", sql.Int, projectID)
            .input("UserID", sql.Int, userID)
            .input("Comment", sql.NVarChar, comment)
            .input("Rating", sql.Int, rating)
            .execute('MakeProjectRating');
        let firstName = result.output.FirstName;
        let lastName = result.output.LastName

        return res.status(201).json({
            message: "project calificado exitosamente.",
            firstName,
            lastName
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    } 
};

export const updateRating = async (req, res) => {
    const { ratingID, rating } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        ratingID == null || rating == null || (rating < 1 || rating > 5)
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("RatingID", sql.Int, ratingID)
            .input("Rating", sql.Int, rating)
            .execute('UpdateRating');

        return res.status(201).json({
            message: "Calificacion de project modificada."
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    } 
};

export const answerProjectRating = async (req, res) => {
    const { ratingID, answer } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        ratingID == null || answer == null 
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("RatingID", sql.Int, ratingID)
            .input("Answer", sql.NVarChar, answer)
            .execute('AnswerProjectRating');

        return res.status(201).json({
            message: "Respuesta a calificacion realizada."
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    } 
};

export const updateCommentRating = async (req, res) => {
    const { ratingID, comment } = req.body;

    console.log(req.body)
    // Se verifica si algún campo requerido no se ingresó
    if (
        ratingID == null || comment == null 
    ){
        return res.status(400).json({ msg: "Error: Información incompleta" });
    }

    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input("RatingID", sql.Int, ratingID)
            .input("Comment", sql.NVarChar, comment)
            .execute('UpdateCommentRating');

        return res.status(201).json({
            message: "Comentario del project actualizado."
        });
    } catch (error) {
        res.status(500).send(error.message); // Enviar mensaje de error
    } 
};

export const deactivateProjectRating = async (req, res) =>{
    const {ratingID} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        ratingID == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try{
        const pool = await getConnection()
        const result = await pool
        .request()
        .input("RatingID", sql.Int, ratingID)
        .execute('deactivateProjectRating')

        if(result.rowsAffected[0] === 0){
            return res.status(404).json({message: "Rating del project no encontrado"});
        }

        return res.json({message: "Rating del project eliminada correctamente"});
    }
    catch(error){        
        res.status(500);
        res.send(error.message);
    }
};

export const getAverageRatingProject = async (req, res) => {
    const { projectID } = req.body; // Obtiene el parámetro de consulta de la URL
    
    // se verifica si algun campo requerido no se ingreso
    if (
        projectID == null
    ){ 
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {

        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.request()
            .input("ProjectID", sql.Int, projectID)
            .execute('GetAverageRatingProject');
        res.json(result.recordset); // Envía los datos como JSON
    } catch (error) {
        res.status(500).send(error.message); // Maneja errores
    }
};

export const checkNearbyProjects = async () => {
    try {
        const pool = await getConnection(); // Asumiendo que esta es tu función para obtener conexión a la base de datos
        const result = await pool.query(`
            SELECT 
                p.ProjectName,  
                p.CurrentCollection,
                p.FundingGoal,
                p.FundingDeadline,
                u.Email AS OwnerEmail, 
                u.FirstName AS OwnerFirstName,
                u.LastName AS OwnerLastName
            FROM 
                Projects p
            JOIN 
                Users u ON p.OwnerID = u.UserID
            WHERE 
                p.FundingDeadline BETWEEN GETDATE() AND DATEADD(day, 1000, GETDATE())
                AND p.CurrentCollection < p.FundingGoal;
        `);

        // Verifica si result y recordset están definidos
        if (result && result.recordset && result.recordset.length > 0) {
            let projectList = `
                <h2>Proyectos en Riesgo</h2>
                <p>Los siguientes proyectos están próximos a su fecha límite sin alcanzar su objetivo de financiación:</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Proyecto</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Monto Recolectado</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Monto Objetivo</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Fecha Límite</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Propietario</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Correo del Propietario</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.recordset.map(project => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;">${project.ProjectName}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${project.CurrentCollection}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${project.FundingGoal}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${new Date(project.FundingDeadline).toLocaleDateString()}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${project.OwnerFirstName} ${project.OwnerLastName}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${project.OwnerEmail}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            await emailService.sendNearbyProjects(projectList);
            console.log("Correo enviado con la lista de proyectos en riesgo."); // Agrega un log para confirmar el envío
        } else {
            console.log("No hay proyectos cercanos a su fecha límite que no hayan cumplido su objetivo");
        }

    } catch (error) {
        console.error("Error en checkNearbyProjects:", error); // Mensaje de error más informativo
        throw error; // Re-lanza el error si es necesario
    }
};

// Programar la tarea para ejecutarse diariamente a las 11:59 PM
cron.schedule('59 23 * * *', async () => {
    console.log("Ejecutando tarea de verificación de proyectos cercanos...");
    try {
        await checkNearbyProjects(); // Llamar a la función sin req y res
    } catch (error) {
        console.error("Error al verificar proyectos cercanos:", error);
    }
});
