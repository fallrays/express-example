var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

exports.test = function (req, res) {
    fs.readFile("./views/index.html", "utf8", function (err,buf) {
        console.log(process.env.SERVER_PORT);
        res.end(buf);
    })
}