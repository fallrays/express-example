const { verify } = require('../utils/jwt.util.js');
const dotenv = require('dotenv');

dotenv.config();

const { JWT_SECRET } = process.env;

const tokenValidator = (req, res, next) => 
{
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.slice(7);

        try {
            const decodedToken = verify(token, JWT_SECRET);
            
            if (decodedToken.result == 'success') {
                req.id = decodedToken.data.id;
                req.email = decodedToken.data.email;

                next();
            } else {
                res.status(401).json({
                    result: 'fail', 
                    message: decodedToken.message
                });
            }
        } catch (error) {
            res.status(401).json({
                result: 'fail', 
                message: '유효하지 않은 토큰입니다'
            });
        }
    } else {
        res.status(401).json({
            result: 'fail', 
            message: '토큰이 존재하지 않습니다'
        });
    }
};

module.exports = tokenValidator;