import {
REG_PASS,
REG_FAIL,
AUTH_PASS,
AUTH_FAIL,
LOGIN_PASS,
LOGIN_FAIL,
LOGOUT
} from '../actions/types';


const initialState = {

    token: localStorage.getItem('token'),

    isAuthenticated:false,

    loading:true,

    user:null,

    registrationSuccess:false

};



export default function authReducer(
    state = initialState,
    action
){

const { type, payload } = action;


switch(type){


case AUTH_PASS:

return {

    ...state,

    isAuthenticated:true,

    loading:false,

    user:payload

};



case LOGIN_PASS:
  return {

    ...state,

    ...payload,

    isAuthenticated:true,

    loading:false

};  
case REG_PASS:

return {

    ...state,

    registrationSuccess:true,

    loading:false,

    user:payload.employee

};



case AUTH_FAIL:
case LOGIN_FAIL:
case REG_FAIL:
case LOGOUT:

localStorage.removeItem('token');


return {

    ...state,

    token:null,

    isAuthenticated:false,

    loading:false,

    user:null,

    registrationSuccess:false

};



default:

return state;

}


}