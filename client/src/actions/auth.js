import axios from 'axios';
import {
  REG_PASS,
  REG_FAIL
} from './types';

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