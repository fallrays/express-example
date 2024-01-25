const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const { JWT_SECRET } = process.env;

const sign = (user) =>
{
    const payload = { 
        id: user.id, 
        email: user.email 
    };
    const option = { 
        algorithm: 'HS256', 
        expiresIn: '1h', 
        issuer: 'fallrays' 
    };

    return jwt.sign(payload, JWT_SECRET, option);
}

const verify = (token) =>
{
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        return {
            result: 'success',
            data: decodedToken
        };
    } catch (err) {
        return {
            result: 'fail',
            message: err.message
        }
    }
}

const refresh = () =>
{
    const payload = {};
    const option = { 
        algorithm: 'HS256', 
        expiresIn: '14d', 
        issuer: 'fallrays' 
    };

    return jwt.sign(payload, JWT_SECRET, option);
}

const refreshVerify = (refreshToken, user) =>
{
    // user정보로 DB에 저장된 refreshToken값 가져오기
    const dbRefreshToken = '';

    if (refreshToken == dbRefreshToken) {
        // refreshToken 검증
        try {
            jwt.verify(refreshToken, JWT_SECRET);
            return true;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = { sign, verify, refresh, refreshVerify };