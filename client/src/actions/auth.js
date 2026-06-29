import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import {
  REG_PASS,
    REG_FAIL,
    AUTH_PASS,
    AUTH_FAIL,
    LOGIN_PASS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

// Load logged-in user - Timimg and Screen change issue - Not working properly

// export const loadUser = () => async dispatch => {


//     const token = localStorage.getItem('token');


//     if(!token){

//         dispatch({
//             type:AUTH_FAIL
//         });

//         return;

//     }


//     setAuthToken(token);


//     try{


//         const res = await axios.get(
//             'http://localhost:5000/api/login'
//         );


//         console.log(
//             "LOAD USER SUCCESS",
//             res.data
//         );


//         dispatch({

//             type:AUTH_PASS,

//             payload:res.data

//         });


//     }
//     catch(err){


//         console.log(
//             "LOAD USER FAILED",
//             err.response?.data
//         );


//         dispatch({

//             type:AUTH_FAIL

//         });

//     }

// };

//// Again Load logged-in user correctly - Working properly now
export const loadUser = () => async dispatch => {


    const token = localStorage.getItem('token');


    if(token){

        setAuthToken(token);

    }


    try{


        const res = await axios.get(
            'http://localhost:5000/api/auth'
        );


        console.log(
            "LOAD USER SUCCESS",
            res.data
        );


        dispatch({

            type:AUTH_PASS,

            payload:res.data

        });


    }
    catch(err){


        console.log(
            "LOAD USER FAILED",
            err.response?.data
        );


        dispatch({

            type:AUTH_FAIL

        });


    }

};

// Register user
export const register = ({ fullname, email, password, confirmPassword }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  const body = JSON.stringify({ fullname, email, password, confirmPassword });

  try {
    console.log(
        "REQUEST SENT",
        body
    );
    const res = await axios.post('http://localhost:5000/api/register', body, config);

    console.log(
        "BACKEND SUCCESS RESPONSE",
        res.data
    );

    dispatch({
      type: REG_PASS,
      payload: res.data
    });
  } catch (err) {
    console.log(
        "BACKEND ERROR RESPONSE",
        err.response?.data
    );
    if(err.response?.data?.errors){

        err.response.data.errors.forEach(
            error => alert(error)
        );

    }


    if(err.response?.data?.message){

        alert(
            err.response.data.message
        );

    }
    dispatch({
      type: REG_FAIL
    });
  }
};

// Login

export const login =
({email,password}) =>
async dispatch => {


    const body =
    JSON.stringify({

        email,
        password

    });


    const config={
        headers:{
            "Content-Type":"application/json"
        }

    };


    try{
        console.log(
            "LOGIN REQUEST",
            body
        );

        const res =
        await axios.post(
            'http://localhost:5000/api/login',
            body,
            config
        );

        console.log(
            "LOGIN SUCCESS",
            res.data
        );

        setAuthToken(res.data.token);

        dispatch({

            type:LOGIN_PASS,

            payload:res.data

        });

    }
    catch(err){
        console.log(
            "LOGIN FAILED",
            err.response?.data
        );


        if(err.response?.data?.message){

            alert(
                err.response.data.message
            );

        }


        if(err.response?.data?.message){

            alert(
                err.response.data.message
            );

        }


        dispatch({

            type:LOGIN_FAIL

        });


    }


};




// logout

export const logout = () => dispatch => {

    setAuthToken(null);

    dispatch({

        type:LOGOUT

    });


};