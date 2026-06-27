import React from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../actions/auth';



const Navbar = () => {


    const dispatch = useDispatch();

    const history = useHistory();


    const {
        isAuthenticated,
        loading
    } = useSelector(
        state => state.auth
    );



    const handleLogout = () => {


        dispatch(logout());


        history.push('/login');


    };



    const authLinks = (

        <ul>

            <li>

            <a
            href="#!"
            onClick={handleLogout}
            >

            Logout

            </a>


            </li>


        </ul>

    );



    const guestLinks = (

        <ul>

            <li>

            <Link to="/register">

            Register

            </Link>


            </li>



            <li>

            <Link to="/login">

            Login

            </Link>


            </li>


        </ul>

    );




    return (

        <nav className="navbar bg-dark">


        <h1>


        <Link to="/">

        📖 HR-UserManagement

        </Link>


        </h1>



        {!loading && (

            <div>

            {

            isAuthenticated

            ?

            authLinks

            :

            guestLinks

            }

            </div>

        )}



        </nav>

    );


};


export default Navbar;