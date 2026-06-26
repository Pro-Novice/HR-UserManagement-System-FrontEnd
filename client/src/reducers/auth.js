import {
  REG_PASS,
  REG_FAIL
} from '../actions/types';

const initialState={

    token:null,

    isAuthenticated:false,

    loading:false,

    user:null

}

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case REG_PASS:

    return {

        ...state,

        ...payload,

        isAuthenticated:true,

        loading:false

    };
    case REG_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
export default authReducer;