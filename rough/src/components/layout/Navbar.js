// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className='navbar bg-dark'>
//       <h1>
//         <a href='index.html'><i className='fas fa-book-reader'></i> HRED</a>
//       </h1>
//       <ul>
//         <li><a href='register.html'>Register</a></li>
//         <li><a href='login.html'>Login</a></li>
//       </ul>
//     </nav>
//   )
// }

// export default Navbar

import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {


    return (

        <nav className="navbar bg-dark">


            <h1>

                <Link to="/">
                    {/* <i className="fas fa-book-reader"></i> */}
                    
                    HRED

                </Link>

            </h1>



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


        </nav>

    )

}


export default Navbar;