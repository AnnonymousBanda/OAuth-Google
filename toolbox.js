// __dirname
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

// database connectio
import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// connecting with the local database
const getPool=function(){
    return mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
}).promise()}



export const getUser=async function(table,id){

    const pool=getPool()
    try{
        const [[row]]= await pool.query('SELECT * FROM ?? WHERE id = ?',[table,id])
        return row;
    }
    catch(err){
        console.log(err.message)
    }
    finally{
        pool.end()
    }
}

export const createUser = async function (table, id, email, userName, userProfilePic) {
    const pool = getPool();
    try{
        await pool.query('INSERT INTO ?? (id,email,username,pic) VALUES (?, ?, ?, ?);', [table, id, email, userName, userProfilePic])
        return await getUser('users',id) 
    } catch (err) {
        console.log(err.message);
        throw err;
    } finally {
        pool.end();
    }
};
