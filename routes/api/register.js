const express = require('express');

const router = express.Router();

const HrController =
require('../../controller/hrController');


const hrController =
new HrController();



router.get(
    '/',
    (req,res)=>{
        res.send("HR route");
    }
);



router.post(
    '/',
    hrController.addUser
);



module.exports = router;