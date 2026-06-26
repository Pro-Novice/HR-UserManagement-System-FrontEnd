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
    const res = await axios.post('http://localhost:5000/api/register', body, config);

    dispatch({
      type: REG_PASS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => alert(error));
    }
    dispatch({
      type: REG_FAIL
    });
  }
};