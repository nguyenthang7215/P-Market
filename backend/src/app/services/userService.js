import bcrypt from 'bcrypt';
import pool from '../../configs/mysql.js';
import multer from 'multer';

export async function createUser({ firstName, lastName, userName, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const queryText = `
        insert into User (firstName, lastName, userName, email, passwordHash)
        values (?, ?, ?, ?, ?)
    `;
    const [results] = await pool.query(queryText, [firstName, lastName, userName, email, passwordHash]);
    // luon tra ve 1 mang [resultsObject, fieldsObject]

    const insertId = results.insertId;
    const [rows] = await pool.query(`
        select id, firstName, lastName, userName, email
        from User where id = ?`
        , [insertId]);
    // tra ve 1 mang [rowsArray, fieldsObject]

    return rows[0];
}

// Dung de truy van lay ca mat khau
export async function findUserByEmail(email) {
    const [rows] = await pool.query(`
        select id, userName, email, passwordHash 
        from User 
        where email = ?
        `, [email]);

    return rows[0];
}

export async function findUserByUserName(userName) {
    const [rows] = await pool.query(`
        select id, userName, email
        from User
        where userName = ?
        `, [userName]);
    return rows[0];
}

export async function resetPassword(id, password) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    await pool.query(`
        update User
        set passwordHash = ?
        where id = ? 
        `, [newPassword, id]);
}

export async function updateUserName(id, userName) {
    await pool.query(`
        update User
        set userName = ?
        where id = ?
        `, [userName, id]);
}

export async function updatePhone(id, phone) {
    await pool.query(`
        update User
        set phone = ?
        where id = ?
        `, [phone, id]);
}

export async function updateAddress(id, address) {
    await pool.query(`
        update User
        set address = ?
        where id = ?  
        `, [address, id]);
}

export async function uploadAvatar(id, imagePath) {
    await pool.query(`
        update User
        set avatar = ? 
        where id = ?
        `, [imagePath, id]);
}