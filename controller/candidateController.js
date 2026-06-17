    const { validationResult } = require('express-validator');
    const UserService = require('../services/userService');

    class UserController {

        constructor() {
            this.userService = new UserService();
        }

        addUser = async (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            try {

                const result =
                    await this.userService.createUser(
                    req.body,
                    req.user.id
                );

                return res.status(201).json(result);

            } catch (err) {

                return res.status(400).json({
                    message: err.message
                });

            }
        };

    }

    module.exports = UserController;