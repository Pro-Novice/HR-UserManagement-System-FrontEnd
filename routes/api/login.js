const express = require('express');

const router = express.Router();

const auth = require('../../middleware/hrauth.js');

const HrController =
require('../../controller/hrController');


const hrController =
new HrController();


router.get(
    '/',
    auth,
    hrController.getAuthUser
);


router.post(
    '/',
    hrController.loginUser
);



module.exports = router;