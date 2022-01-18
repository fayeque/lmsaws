import {REGISTER_SUCCESS,USER_LOADED,REGISTER_FAIL,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from "../actions/types";

const initialState={
    token:localStorage.getItem("token"),
    user:null,
    isAuthenticated:false,
    loading:true
};

export default function(state=initialState,action){
    const {type,payload} = action;

    switch(type){
        case USER_LOADED:
            return {
                ...state,
                user:payload,
                isAuthenticated:true,
                loading:false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token",payload.token);
            return {
            ...state,
            ...payload,
            isAuthenticated:true,
            loading:true
        }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated:false,
                loading:false,
                token:null,
                user:null
            }
        default: return state
    }
}