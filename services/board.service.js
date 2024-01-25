const pool = require('../configs/database.mysql.js');

class BoardService
{
    getList = async () => {
        try {
            let connection = await pool.getConnection();
            let sql = 'SELECT * FROM boards';
            let [rows] = await connection.query(sql);
            connection.release();

            return rows;
        } catch (err) {
            console.log(err);
        }

    }

    getInfo = async (id) => {
        try {
            let connection = await pool.getConnection();
            let sql = 'SELECT * FROM boards where id = ?';
            let params = [id];
            let [row] = await connection.query(sql, params);
            connection.release();

            return row;
        } catch (err) {
            console.log(err);
        }
    }

    create = async (data) =>
    {
        try {
            let connection = await pool.getConnection();
            let sql = "INSERT INTO boards SET ?";
            let [rs] = await connection.query(sql, data);
            let id = rs.insertId;
            connection.release();
            
            return rs.insertId;
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = BoardService;