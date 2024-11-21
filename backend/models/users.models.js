import sql from "mssql";
import {getConnection} from "../database/connection.js";
import emailService from "../services/emailService.js";
 

export const login = async (req, res) => {
    console.log(req.body); // Verifica que los datos del cliente estén llegando correctamente

    const { email, password } = req.body;

    // Verificación de campos requeridos
    if (!email || !password) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    }

    try {
        const pool = await getConnection();

        // Ejecuta el procedimiento almacenado de login
        const result = await pool
            .request()
            .input("Email", sql.VarChar, email)
            .input("Password", sql.VarChar, password)
            .execute("Login");

        // Verifica si se encontró el usuario
        if (result.recordset.length === 0) {
            return res.status(404).json({ msg: "Usuario o contraseña incorrectos" });
        }

        const userInfo = result.recordset[0];

        // Respuesta exitosa en formato JSON
        return res.status(200).json({
            message: "Login realizado exitosamente.",
            userID: userInfo.UserID,
            rol: userInfo.Rol
        });

    } catch (error) {
        // Manejo de errores del servidor
        console.error('Error en login:', error);
        return res.status(500).json({ msg: "Error en el servidor/Error datos mal ingresados", error: error.message });
    }
};

export const createUser = async (req, res) => {
    console.log(req.body)
    const { nombre, apellidos, cedula, email, area, dinero, telefono, contrasena } = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        nombre == null || apellidos == null || cedula == null || email == null || area == null 
        || dinero == null || telefono == null || contrasena == null
    ) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    } 

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("FirstName", sql.VarChar, nombre)
        .input("LastName", sql.VarChar, apellidos)
        .input("Cedula", sql.VarChar, cedula)
        .input("Email", sql.VarChar, email)
        .input("WorkArea", sql.VarChar, area)
        .input("IniMoney", sql.Decimal, dinero)
        .input("PhoneNumber", sql.VarChar, telefono)
        .input("Password", sql.VarChar, contrasena)
        .execute('CreateUser');    
 
        // eviar la bienvenida al usuario por correo electronico
        // await emailService.sendRegisterEmail({nombre, email});

        return res.status(201).json({
            message: "Usuario registrado exitosamente.",
            nombre,
            apellidos,
            cedula,
            email, 
            area,
            dinero,
            telefono
        });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};
 
export const updateUser = async (req, res) => {
    console.log(req.body)
    const {userID, firstName, lastName, cedula, password, workArea, digitalMoney, phoneNumber} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        userID == null || firstName == null || lastName == null || cedula == null || workArea == null 
        || digitalMoney == null || phoneNumber == null || password == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .input("FirstName", sql.VarChar, firstName)
        .input("LastName", sql.VarChar, lastName)
        .input("Cedula", sql.VarChar, cedula)
        .input("WorkArea", sql.VarChar, workArea)
        .input("DigitalMoney", sql.Decimal, digitalMoney)
        .input("PhoneNumber", sql.VarChar, phoneNumber)
        .input("Password", sql.VarChar, password)
        .execute('UpdateUser');   

        res.json({
            userID,
            firstName,
            lastName,
            cedula,
            workArea,
            digitalMoney,
            phoneNumber,
        });
        
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

export const readUser = async (req, res) =>{
    const {userID } = req.query; // Obtiene los parámetros de consulta de la URL

    // se verifica si algun campo requerido no se ingreso
    if (
        userID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .query(
            "SELECT * FROM Users WHERE UserID = @UserId"
        );   
        
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);
                
        res.json(result.recordset); // Envía los datos como JSON

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const readUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute("ReadUsers");
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const changeUserState = async (req, res) => {
    const {isActive, userID} = req.body;

    if (isActive == null || userID == null){
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    if (isActive != 0 && isActive != 1){
        return res.status(400).json({ msg: "Error: El estado del usuario solo puede ser 1 o 0" });
    }

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .input("IsActive", sql.Bit, isActive)
        .query(
            "UPDATE Users SET IsActive = @isActive WHERE UserID = @UserID"
        );

    if (result.rowsAffected[0] === 0) return res.sendStatus(404);
 
    res.json({ isActive, id: req.params.id });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const activeUserCount = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .query(
            "SELECT COUNT(*) AS ActiveUserCount FROM Users WHERE IsActive = 1"
        );
        
        const activeUserCount = result.recordset[0].ActiveUserCount;
        //res.json(result.recordset); // Envía los datos como JSON
        res.json({ activeUserCount });
    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}   
   
export const addUserMoney = async (req, res) =>{
    console.log(req.body)
    const {userID, amount} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        userID == null || amount == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .input("DigitalMoney", sql.Decimal, amount)
        .query(
            "UPDATE Users SET DigitalMoney = DigitalMoney + @DigitalMoney WHERE UserID = @UserID SELECT DigitalMoney FROM Users WHERE UserID = @UserID;"
        )
        
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);
                    
        const newDigitalMoney = result.recordset[0]

        res.json(newDigitalMoney);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const addUserCorreo = async (req, res) =>{
    console.log(req.body)
    const {UserID, NewEmail} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        UserID == null || NewEmail == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("NewEmail", sql.VarChar, NewEmail)
        .execute('UpdateUserEmail');

        res.json("Correo actualizado");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const addUserPassword = async (req, res) =>{
    console.log(req.body)
    const {UserID, NewPassword} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        UserID == null || NewPassword == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("NewPassword", sql.VarChar, NewPassword)
        .execute('UpdateUserPassword');

        res.json("Contraseña actualizada");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const addUserTelefono = async (req, res) =>{
    console.log(req.body)
    const {UserID, NewPhoneNumber} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        UserID == null || NewPhoneNumber == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("NewPhoneNumber", sql.VarChar, NewPhoneNumber)
        .execute('UpdateUserPhoneNumber');

        res.json("Telefono actualizado");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
export const addUserArea = async (req, res) =>{
    console.log(req.body)
    const {UserID, NewArea} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        UserID == null || NewArea == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("NewWorkArea", sql.VarChar, NewArea)
        .execute('UpdateUserWorkArea');

        res.json("Area actualizada");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const addUserRol = async (req, res) =>{
    console.log(req.body)
    const {UserID, NewRol} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        UserID == null || NewRol == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, UserID)
        .input("NewRole", sql.VarChar, NewRol)
        .execute('UpdateUserRole');

        res.json("Rol actualizado");

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


export const makeDonation = async (req, res) =>{
    console.log(req.body)
    const {projectID, donation, userID} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        projectID == null || donation == null || userID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("DonorID", sql.Int, userID)
        .input("ProjectID", sql.Int, projectID)
        .input("Amount", sql.Decimal, donation)
        .execute('MakeDonation');   
        
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);
                
        const donorInfo = result.recordsets[0][0]; // Primer registro del primer SELECT
        const ownerInfo = result.recordsets[1][0]; // Primer registro del segundo SELECT
        const donorFirstName = donorInfo.FirstName;
        const donorLastName = donorInfo.LastName;
        const donorEmail = donorInfo.Email;
        const donorPhoneNumber = donorInfo.PhoneNumber;
        const ownerFirstName = ownerInfo.FirstName;
        const ownerEmail = ownerInfo.Email;
        const ownerProjectName = ownerInfo.ProjectName;
        const isSuspiciousDonation = donorInfo.IsSuspiciousDonation
        const amount = donation;
        
        if (isSuspiciousDonation){
            await emailService.sendSuspiciousDonation({  
                ownerFirstName, ownerEmail, ownerProjectName, 
                amount, donorFirstName, donorLastName, 
                donorPhoneNumber, donorEmail
            });
        }
        
        
        await emailService.sendGratitudeEmail({donorFirstName, donorEmail});
        await emailService.sendDonationEmail({  
                                                ownerFirstName, ownerEmail, ownerProjectName, 
                                                amount, donorFirstName, donorLastName, 
                                                donorPhoneNumber, donorEmail
                                            });
        
        
        return res.status(201).json({
            msg: "Donación exitosa",
            donor: {
                firstName: donorInfo.FirstName,
                lastName: donorInfo.LastName,
                email: donorInfo.Email,
                phoneNumber: donorInfo.PhoneNumber
            },
            owner: {
                firstName: ownerInfo.FirstName,
                email: ownerInfo.Email,
                projectName: ownerInfo.ProjectName
            },
            isSuspiciousDonation: {
                isSuspiciousDonation: isSuspiciousDonation 
            }

        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getUserDonations = async (req, res) =>{
    console.log(req.query)
    const { userID } = req.query; // Obtiene los parámetros de consulta de la URL

    // se verifica si algun campo requerido no se ingreso
    if (
        userID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .execute('GetUserDonations');   
        
        //if (result.rowsAffected[0] === 0) return res.sendStatus(404);
                
        const donations = result.recordsets[0];
        
    
        res.json(donations);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getAllDonations = async (req, res) =>{
    console.log(req.query)
    const { ProjectID } = req.query;
    if (
        ProjectID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }
    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("ProjectID", sql.Int, ProjectID)
        .execute('GetAllDonations');   
        
        if (result.rowsAffected[0] === 0) return res.sendStatus(404);
                
        const userInfo = result.recordsets[0];
    
        res.json(result.recordset);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const donationsCount = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .query(
            "SELECT COUNT(*) AS DonationsCount FROM Donations"
        );
        
        const donationsCount = result.recordset[0].DonationsCount;

        res.json({ donationsCount });
    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}   


export const updateUserCurrency = async (req, res) => {
    console.log(req.body)
    const {userID} = req.body;

    if (userID == null){
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("UserID", sql.Int, userID)
        .query(
            "UPDATE CurrentInfo SET UserID = @userID WHERE CurrentID = 1"
        );
 
    res.json(result.recordset);
    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getUserCurrent = async (req, res) =>{

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .query(
            "SELECT UserID FROM CurrentInfo WHERE CurrentID = 1"
        );   
                    
        const userInfo = result.recordset[0];

        // Respuesta exitosa en formato JSON
        res.json(userInfo);

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}