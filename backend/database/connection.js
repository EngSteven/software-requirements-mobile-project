import sql from "mssql";



const dbSettings = {
    user: "sqladmin",
    password: "Steven123",
    server: "sqlservicio.database.windows.net",
    database: "sqldatabase",
    options: {
        encrypt: true, 
        trustServerCertificate: true,
    }
};



export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error("error");
    }
};