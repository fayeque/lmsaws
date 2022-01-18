import axios from "axios";
import { REGISTER_SUCCESS,USER_LOADED,SET_ALERT,REGISTER_FAIL,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";


export const loadUser=() => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res=await axios.get("/api");
        console.log("User is loaded successfully");
        console.log(res.data);
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        });
    }

}


export const adminLogin = (email,password) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({email,password});

    try{
        const res= await axios.post("/api/adminLogin",body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(loadUser())

    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach((error) => {
                dispatch(setAlert(error.msg,"danger"));
            })
        }
        dispatch({
            type:LOGIN_FAIL
        })

    }
}

export const employeeLogin = (email,password) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body=JSON.stringify({email,password});

    try{
        const res= await axios.post("/api/employeeLogin",body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(loadUser())

    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach((error) => {
                dispatch(setAlert(error.msg,"danger"));
            })
        }
        dispatch({
            type:LOGIN_FAIL
        })

    }
}


export const register= ({name,email,password,mobile,employeeID,department}) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const body=JSON.stringify({name,email,password,mobile,employeeID,department});

    try{
        const res= await axios.post("/api/signup",body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

        dispatch(loadUser())

    }catch(err){
        const errors=err.response.data.errors;
        if(errors){
            errors.forEach((error) => {
                dispatch(setAlert(error.msg,"danger"));
            })
        }
        dispatch({
            type:REGISTER_FAIL
        })

    }
}

export const logout = (history) => dispatch =>{
    dispatch({type:LOGOUT});
    history.push("/");
}
