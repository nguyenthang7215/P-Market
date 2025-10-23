import bcrypt from 'bcrypt';
import pool from '../../configs/mysql.js';

export async function createUser({ userName, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const queryText = `
        insert into User (userName, email, passwordHash)
        values (?, ?, ?)
    `;
    const [results] = await pool.query(queryText, [userName, email, passwordHash]);
    // luon tra ve 1 mang [resultsObject, fieldsObject]

    const insertId = results.insertId;
    const [rows] = await pool.query(`
        select id, userName, email
        from User where id = ?`
        , [insertId]);
    // tra ve 1 mang [rowsArray, fieldObject]

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
