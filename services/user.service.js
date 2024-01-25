const pool = require('../configs/database.mysql.js');
const jwt = require('jsonwebtoken');
const jwtUtil = require('../utils/jwt.util.js');
const dotenv = require('dotenv');

dotenv.config();

class UserService
{
    login = async (data) => {
        try {
            const email = data.email;
            const password = data.password;

            let connection = await pool.getConnection();
            let sql = "SELECT * FROM users where email = ?";
            let params = [email];
            let [rows] = await connection.query(sql, params);
            connection.release();

            if (rows.length == 0) {
                return { 
                    result: 'fail',
                    message: 'Not User'
                };
            }

            const user = rows[0];

            if (user.password !== password) {
                return { 
                    result: 'fail',
                    message: 'Password Invalid'
                };
            }

            const token = await jwtUtil.sign(user);
            const refreshToken = await jwtUtil.refresh();

            // DB SAVE...

            return { 
                result: 'success',
                data: {
                    token: token, 
                    refreshToken: refreshToken
                }
            };
        } catch (err) {
            console.log(err);
            return { 
                result: 'fail',
                message: err.message
            };
        }
    }

    tokenRefresh = async (req, res) =>
    {
        if (req.headers.authorization && req.headers.refresh) {
            const authToken = req.headers.authorization.split('Bearer ')[1];
            const refreshToken = req.headers.refresh;

            // Token Verify
            const authResult = jwtUtil.verify(authToken);

            const user = jwt.decode(authToken);
            if (user === null) {
                return { 
                    result: 'fail',
                    message: 'Token Invalid'
                };
            }

            // refreshToken Verify
            const refreshResult = jwtUtil.refreshVerify(refreshToken, user);
            if (refreshResult === false) {
                return { 
                    result: 'fail',
                    message: 'RefreshToken Invalid'
                };
            }

            // Token이 만료일때만 재발급?
            if (authResult.message != 'jwt expired') {

            }

            // 재발급
            const newAccessToken = jwtUtil.sign(user);
            return { 
                result: 'success',
                data: {
                    token: newAccessToken, 
                    refreshToken: refreshToken
                }
            };
        } else {
            return { 
                result: 'fail',
                message: 'Token or RefreshToken Invalid'
            };
        }
    }

    getInfo = async (id) => {
        try {
            let connection = await pool.getConnection();
            let sql = 'SELECT * FROM users where id = ?';
            let params = [id];
            let [row] = await connection.query(sql, params);
            connection.release();

            return { 
                result: 'success',
                data: row
            };
        } catch (err) {
            console.log(err);

            return { 
                result: 'fail',
                message: err.message
            };
        }
    }

    create = async (data) =>
    {
        try {
            let connection = await pool.getConnection();
            let sql = "INSERT INTO users SET ?";
            let [rs] = await connection.query(sql, data);
            let id = rs.insertId;
            connection.release();
            
            return { 
                result: 'success',
                data: {
                    id: id
                }
            };
        } catch (err) {
            console.log(err);

            return { 
                result: 'fail',
                message: err.message
            };
        }
    }
}

module.exports = UserService;