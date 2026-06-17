const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const UserController = require('../../controller/candidateController');

const userController = new UserController();
const auth = require('../../middleware/hrauth');

router.post(
    '/',
    auth,
    [
        check('firstname', 'First name is required').not().isEmpty(),
        check('lastname', 'Last name is required').not().isEmpty(),
        check('phone', 'Phone number is required').not().isEmpty(),
        check('email', 'Please include a valid email')
            .isEmail()
            .normalizeEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
    ],
    userController.addUser
);

router.get(
    '/',
    auth,
    userController.getCandidates
);

router.put(
    '/:candidateId',
    auth,
    userController.updateUser
);

// router.delete(
//     '/:candidateId',
//     auth,
//     userController.deleteUser
// );

module.exports = router;