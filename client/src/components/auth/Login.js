import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../actions/auth';


const Login = () => {


    const dispatch = useDispatch();


    const { isAuthenticated } =
        useSelector(state => state.auth);



    const [formData, updateFormData] = useState({

        email:'',
        password:''

    });



    const {
        email,
        password
    } = formData;



    const onChange = e => {


        updateFormData({

            ...formData,

            [e.target.name]:e.target.value

        });


    };



    const onSubmit = e => {


        e.preventDefault();


        console.log(
            "LOGIN CLICKED",
            formData
        );


        dispatch(
            login({
                email,
                password
            })
        );


    };



    if(isAuthenticated){

        return <Redirect to="/welcome"/>

    }



    return (

        <div>


        <h1 className="large text-primary">

            Log in

        </h1>


        <p className="cta">

            <i className="fas fa-sign-in-alt"></i>

            Log in to your account

        </p>



        <form
            className="form"
            onSubmit={onSubmit}
        >



        <div className="form-group">


        <input

            type="email"

            placeholder="Email Address"

            name="email"

            value={email}

            onChange={onChange}

            required

        />


        </div>




        <div className="form-group">


        <input

            type="password"

            placeholder="Password"

            name="password"

            value={password}

            onChange={onChange}

            minLength="4"

            required

        />


        </div>



        <input

            type="submit"

            className="btn btn-primary"

            value="Login"

        />


        </form>




        <p className="m">

        Not registered yet?

        <Link to="/register">

            Register now

        </Link>


        </p>


        </div>

    );


};


export default Login;