import {getConnection} from '../database/connection.js';
import emailService from "../services/emailService.js";
import sql from 'mssql';
import cron from 'node-cron';

export const createForum = async (req, res) => {
    console.log(req.body)
    const { title, subject, description, ownerID } = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        title == null || subject == null || description == null || ownerID == null 
    ) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    } 

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("Title", sql.VarChar, title)
        .input("Subject", sql.VarChar, subject)
        .input("Description", sql.VarChar, description)
        .input("OwnerID", sql.Int, ownerID)
        .execute('InsertForum');    

        return res.status(201).json({
            message: "Foro registrado exitosamente.",
            title,
            subject,
            description,
            ownerID
        });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

export const readForum = async (req, res) =>{
    const {forumID } = req.query; // Obtiene los parámetros de consulta de la URL

    // se verifica si algun campo requerido no se ingreso
    if (
        forumID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("ForumID", sql.Int, forumID)
        .execute(
            'GetForumByID'
        );   
                        
        res.json(result.recordset); // Envía los datos como JSON

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const readForums = async (req, res) =>{
    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .execute(
            'GetAllActiveForums'
        );   
                
        res.json(result.recordset); // Envía los datos como JSON

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateForum = async (req, res) => {
    console.log(req.body)
    const {forumID } = req.query;
    const {title, subject, description} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        title == null || subject == null || description == null || forumID == null
    ) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("Title", sql.VarChar, title)
        .input("Subject", sql.VarChar, subject)
        .input("Description", sql.VarChar, description)
        .input("ForumID", sql.Int, forumID)
        .execute('UpdateForum');   

        return res.status(201).json({
            message: "Foro actualizado exitosamente.",
            title,
            subject,
            description,
            forumID
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};


export const createForumComment = async (req, res) => {
    
    const { forumID, userID, text, isAnswer=0 } = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        forumID == null || userID == null || text == null  
    ) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    } 

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("ForumID", sql.Int, forumID)
        .input("UserID", sql.Int, userID)
        .input("Text", sql.VarChar, text)
        .input("IsAnswer", sql.Int, isAnswer)
        .execute('InsertForumComment');    

        return res.status(201).json({
            message: "Comentario en foro registrado exitosamente.",
            forumID,
            userID,
            text,
            isAnswer
        });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

export const readForumComment = async (req, res) =>{
    const {commentID } = req.query; // Obtiene los parámetros de consulta de la URL

    // se verifica si algun campo requerido no se ingreso
    if (
        commentID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("CommentID", sql.Int, commentID)
        .execute(
            'GetForumCommentByID'
        );   
                        
        res.json(result.recordset); // Envía los datos como JSON

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const readForumComments = async (req, res) =>{

    const {forumID } = req.query; // Obtiene los parámetros de consulta de la URL

    // se verifica si algun campo requerido no se ingreso
    if (
        forumID == null
    ) {
        return res.status(400).json({ msg: "Error: Informacion incompleta" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("ForumID", sql.Int, forumID)
        .execute(
            'GetActiveCommentsByForumID'
        );   
                
        res.json(result.recordset); // Envía los datos como JSON

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const updateForumComment = async (req, res) => {
    const {commentID } = req.query;
    const {text} = req.body;

    // se verifica si algun campo requerido no se ingreso
    if (
        commentID == null || text == null 
    ) {
        return res.status(400).json({ msg: "Error: Por favor ingrese todos los campos" });
    }

    try {
        const pool = await getConnection();
 
        const result = await pool
        .request()
        .input("CommentID", sql.Int, commentID)
        .input("Text", sql.VarChar, text)
        .execute('UpdateForumComment');   

        return res.status(201).json({
            message: "Comentario de foro actualizado exitosamente.",
            commentID,
            text
        
        });

    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};