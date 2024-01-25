const UserService = require('../services/user.service');

class UserController
{
    userService = new UserService();

    login = async (req, res, next) => 
    {
        const { email, password } = req.body;
        const data = {
            email: email,
            password: password
        };
        const user = await this.userService.login(data);

        res.status(200).json(user);
    }

    tokenRefresh = async (req, res, next) => 
    {
        const user = await this.userService.tokenRefresh(req, res);

        res.status(200).json({data: user});
    }

    getInfo = async (req, res, next) => 
    {
        const user = await this.userService.getInfo(req.id);

        res.status(200).json(user);
    }

    create = async (req, res, next) => 
    {
        const { email, password, name } = req.body;
        let data = {
            email: email, 
            password: password,
            name: name, 
            created_at: new Date()
        };
        const id = await this.userService.create(data);

        res.status(200).json(user);
    }
}

module.exports = UserController;