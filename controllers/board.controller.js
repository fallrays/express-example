const BoardService = require('../services/board.service');

class BoardController
{
    boardService = new BoardService();

    index = async (req, res, next) => {
        const board = await this.boardService.getList();

        res.status(200).json({data: board});
    }

    getInfo = async (req, res, next) => {
        const board = await this.boardService.getInfo(req.params.id);

        res.status(200).json({data: board});
    }

    create = async (req, res, next) => {
        const { name, password, title, content } = req.body;
        let data = {
            name: name, 
            password: password, 
            title: title, 
            content: content,
            created_at: new Date()
        };
        const id = await this.boardService.create(data);

        res.status(200).json({id: id});
    }
}

module.exports = BoardController;