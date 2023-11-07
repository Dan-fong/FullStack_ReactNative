import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const pool = mysql.createPool({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MTSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: process.env.MYSQL_PORT
            }).promise();

export async function getTodoById(id) {
    const [row] = await pool.query(
        `SELECT * FROM todos WHERE id = ?`,[id]);
    return row[0];
}

export async function shareTodo(todo_id, user_id, shared_with_id){
    const [result] = pool.query(`INSERT INTO shared_todos(todo_id, user_id, shared_with_id) VALUES (?, ?, ?)`, [todo_id, user_id, shared_with_id]);
    return result.insertId;
}

export async function toggleCompleted(id, value){
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(`UPDATE todos SET completed = ${newValue} WHERE id = ?`, [id]);
    return result
}

export async function deleteTodo(id){
    const [result] = await pool.query(`DELETE FROM todos WHERE id = ?`, id);
    return result;
}

export async function createTodo(user_id, title){
    const [result] = await pool.query(`INSERT INTO todos(user_id, title) VALUES (?, ?)`, [user_id, title]);
    return result;
}

export async function getUserByEmail(email){
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows[0];
}

export async function getUserById(id){
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
    return rows[0]
}

export async function getSharedTodoById(id){
    const [rows] = await pool.query(`SELECT * FROM shared_todos WHERE id = ?`, [id]);
    return rows[0];
}

export async function getTodo(id){
    const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
    return rows[0]
}

export async function getTodosById(id){
    const [rows] = await pool.query(`
        SELECT todos.*, shared_todos.shared_with_id
        FROM todos
        LEFT JOIN shared_todos 
        ON todos.id = shared_todos.todo_id
        WHERE todos.user_id = ? OR shared_todos.shared_with_id = ?
        `, [id, id]);
        return rows;
}