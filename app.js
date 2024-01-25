const express = require("express");
const app = express();
const parse = require('body-parser');

// Set
app.set("port", process.env.PORT || 3000);
app.set("host", process.env.HOST || "0.0.0.0");

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(express.static(__dirname + "/views"));

// Route
const routesBoard = require("./routes/board.route");
const routesUser = require("./routes/user.route");
app.use(routesBoard);
app.use(routesUser);

// Server
app.listen(app.get("port"), app.get("host"), () =>
    console.log(
        "Server is running on : " + app.get("host") + ":" + app.get("port") + "\n"
    )
);