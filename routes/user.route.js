const router = require("express").Router();
const tokenValidator = require('../middles/token.validator');

const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.post("/user/login", userController.login);
router.get("/user/token/refresh", userController.tokenRefresh);
router.get("/user/:id", tokenValidator, userController.getInfo);
router.post("/user", userController.create);

module.exports = router;