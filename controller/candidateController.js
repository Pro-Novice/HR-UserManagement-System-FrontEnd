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

        getCandidates = async (req, res) => {

            try {
                const candidates = 
                await this.userService.getCandidatesByEmployee(
                    req.user.id
                );
                return res.status(200).json({
                    totalCandidates: candidates.length,
                    candidates
                });
            } catch (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
        };

        updateUser = async (req, res) => {
            try {
                const result =
                await this.userService.updateUser(
                    req.params.candidateId,
                    req.body,
                    req.user.id
                );

                return res.status(200).json(result);
            } catch (err) {
                return res.status(400).json({
                    message: err.message
                });
            }
        };

        deleteUser = async (req, res) => {
            try {
                const result =
                await this.userService.deleteUser(
                    req.params.candidateId,
                    req.user.id
                );

                return res.status(200).json(result);
            } catch (err) {
                return res.status(400).json({
                    message: err.message
                });
            }
        };

        exportCandidatesPdf = async (req, res) => {
            try {
                await this.userService.exportCandidatesPdf(
                req.user.id,
                res
            );
            } catch (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
        };

    }

    module.exports = UserController;