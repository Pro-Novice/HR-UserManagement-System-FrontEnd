// 'use strict';

// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');

// const User = require('../../models/User');


// class HrController {


//     addUser = async (req, res, next) => {

//         // Validation rules
//         const validations = [
//             check(
//                 'fullname',
//                 'Full name is required'
//             )
//             .not()
//             .isEmpty(),

//             check(
//                 'email',
//                 'Please include a valid email'
//             )
//             .isEmail()
//             .normalizeEmail(),

//             check(
//                 'password',
//                 'Password must contain minimum 6 characters'
//             )
//             .isLength({
//                 min: 6
//             }),

//             check(
//                 'confirmPassword',
//                 'Confirm password is required'
//             )
//             .not()
//             .isEmpty()
//         ];


//         await Promise.all(
//             validations.map(validation => validation.run(req))
//         );


//         const errors = validationResult(req);


//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array()
//             });
//         }


//         const {
//             fullname,
//             email,
//             password,
//             confirmPassword
//         } = req.body;



//         try {


//             // Check existing user

//             let existingEmployee = await Employee.findOne({
//                 email
//             });


//             if (existingEmployee) {
//                 return res.status(400).json({
//                     errors: [
//                         {
//                             message: "Employee already exists"
//                         }
//                     ]
//                 });
//             }



//             // Check password match

//             if (password !== confirmPassword) {

//                 return res.status(400).json({
//                     errors: [
//                         {
//                             message: "Password and Confirm Password do not match"
//                         }
//                     ]
//                 });

//             }




//             // Create user

//             const newEmployee = new Employee({

//                 fullname,

//                 email,

//                 password

//             });



//             // Encrypt password

//             const salt = await bcrypt.genSalt(10);


//             newEmployee.password =
//                 await bcrypt.hash(
//                     password,
//                     salt
//                 );



//             const savedEmployee = await newEmployee.save();



//             return res.status(201).json({

//                 message: "Employee created successfully",

//                 employee: {

//                     id: savedEmployee._id,

//                     fullname: savedEmployee.fullname,

//                     email: savedEmployee.email

//                 }

//             });



//         }
//         catch(err){

//             console.log(err.message);

//             return res.status(500)
//                 .send("Server Error");

//         }

//     };





//     getUser(params){

//     }




//     updateUser(params){

//     }



// }



// module.exports = HrController;

'use strict';


const bcrypt = require('bcryptjs');
const Joi = require('joi');

const Employee = require('../models/Employee.js');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const express = require('express');
const app = express();

class HrController {



addUser = async(req,res)=>{
    console.log(
    "REQUEST FROM FRONTEND",
    req.body
);

    const schema = Joi.object({

        fullname:
        Joi.string()
        .min(3)
        .required(),


        email:
        Joi.string()
        .email()
        .required()
        .lowercase(),


        password:
        Joi.string()
        .min(6)
        .required(),


        confirmPassword:
        Joi.string()
        .valid(Joi.ref('password'))
        .required()

    });



    const {error,value}=schema.validate(
        req.body,
        {
            abortEarly:false
        }
    );



    if(error){

        return res.status(400).json({

            errors:error.details.map(
                err=>err.message
            )

        });

    }



    const {
        fullname,
        email,
        password
    }=value;



    try{


        let existingEmployee =
            await Employee.findOne({
                email
            });



        if(existingEmployee){

            return res.status(400).json({

                message:
                "Employee already exists"

            });

        }



        const newEmployee =
            new Employee({

                fullname,

                email,

                password

            });



        const salt =
            await bcrypt.genSalt(10);



        newEmployee.password =
            await bcrypt.hash(
                password,
                salt
            );



        const savedEmployee =
            await newEmployee.save();



        return res.status(201).json({

            message:
            "Employee created successfully",


            employee:{

                id:savedEmployee._id,

                fullname:
                savedEmployee.fullname,


                email:
                savedEmployee.email

            }

        });



    }
    catch(err){

        console.log(err);

        return res.status(500)
        .send("Server Error");

    }

};


loginUser = async(req,res)=>{

    const schema = Joi.object({

        email: Joi.string()
            .email()
            .required()
            .lowercase(),

        password: Joi.string()
            .required()

    });

    const { error, value } = schema.validate(
        req.body,
        {
            abortEarly: false
        }
    );

    if (error) {

        return res.status(400).json({

            errors: error.details.map(
                err => err.message
            )

        });

    }

    const { email, password } = value;

    try {

        // Check employee exists
        const employee = await Employee.findOne({ email });

        console.log(
            "LOGIN REQUEST",
            email
        );


        console.log(
            "FOUND EMPLOYEE",
            employee
        );

        if (!employee) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            employee.password
        );

        if (!isMatch) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }

        // Generate JWT token
        const payload = {

            employee: {

                id: employee._id,

                fullname: employee.fullname,

                email: employee.email

            }

        };

        const token = jwt.sign(
            payload,
            process.env.jwtSecret,
            {
                expiresIn: '1d'
            }
        );

        return res.status(200).json({

            message: "Login successful",

            token,

            employee: {

                id: employee._id,

                fullname: employee.fullname,

                email: employee.email

            }

        });

    }
    catch (err) {

        console.log(err);

        return res.status(500).json({

            message: "Server Error"

        });

    }

}

getAuthUser = async (req, res) => {

    try {

        const employee = await Employee.findById(
            req.user.id
        ).select('-password');

        if (!employee) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json(employee);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: 'Server Error'
        });

    }
};


}


module.exports=HrController;