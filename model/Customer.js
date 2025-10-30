const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

class Customer {

    static async create(data) {
        const conn = await mysql.createConnection(dbConfig);
        const [result] = await conn.execute(
            "INSERT INTO customer (name, address, salary) VALUES (?,?,?)",
            [data.name, data.address, data.salary]
        );

        await conn.end();
        return {id: result.insertId, ...data};
    }

    static async findAll() {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute("SELECT * FROM customer");

        await conn.end();
        return rows;
    }

    static async findById(id) {
        const conn = await mysql.createConnection(dbConfig);
        const [rows] = await conn.execute("SELECT * FROM customer WHERE id=?",[id]);

        await conn.end();
        return rows[0];
    }

    static async update(id, data) {
        const conn = await mysql.createConnection(dbConfig);
        const [result] = await conn.execute(
            "UPDATE customer SET name=?, address=?, salary=? WHERE id=?",
            [data.name, data.address, data.salary, id]
        );

        await conn.end();
        return result.affectedRows ? {id, ...data}:null;
    }

    static async delete(id){
        const conn = await mysql.createConnection(dbConfig);
        const [result] = await conn.execute(
            "DELETE FROM customer WHERE id=?",
            [id]
        );

        await conn.end();
        return result.affectedRows ? true:null;
    }
}

module.exports = Customer;