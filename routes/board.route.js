const router = require("express").Router();
const tokenValidator = require('../middles/token.validator');
const testMiddleware = require('../middles/test.middleware');

const BoardController = require("../controllers/board.controller");
const boardController = new BoardController();

router.get("/board", [tokenValidator, testMiddleware], boardController.index);
router.get("/board/:id", tokenValidator, boardController.getInfo);
router.post("/board", tokenValidator, boardController.create);

module.exports = router;