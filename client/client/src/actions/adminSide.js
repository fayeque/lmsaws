import axios from "axios";
import { FETCH_EMP_SUCCESS,EMP_REG,EMP_REG_FAIL,EMP_REG_ERROR,EMP_REG_SUCCESS,GET_LEAVE_REQUEST,GET_LEAVE_DETAIL,FETCH_LEAVE_DETAIL} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";


export const fetchEmp = (val) => async dispatch => {
    try{
    const res=await axios.get(`/api/fetchEmp?name=${val}`);
    console.log(res.data);
    dispatch({
        type:FETCH_EMP_SUCCESS,
        payload:res.data
    })

    // history.push("/");

    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
       
    }

}
export const registerEmployee = (name,email,mobile,password,department,employeeID,history) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({name,email,mobile,password,department,employeeID});
    try{
    const res=await axios.post("/api/registerEmployee",body,config);
    console.log(res.data.success);
    dispatch({
        type:EMP_REG_SUCCESS,
        payload:true
    })
    dispatch(setAlert(res.data.success[0].msg,"success"));

    // history.push("/");


    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
       
    }
} 

export const getLeaveRequest = (skip) => async dispatch => {
    try{
        const res = await axios.get(`/api/getLeaveRequest?skip=${skip}`);
        dispatch({
            type:GET_LEAVE_REQUEST,
            payload:res.data
        });
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
    }
}

export const getLeaveDetail = (leave_id) => async dispatch => {
    try{
        console.log("leave idddd",leave_id);
        const res = await axios.get(`/api/getLeaveDetail/${leave_id}`);
        console.log("response from the server",res.data);
        dispatch({
            type:GET_LEAVE_DETAIL,
            payload:res.data
        });
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
    }
}

export const submitLeaveStatus = (adminremarks,status,history,leave_id,id) => async dispatch => {
    try{
        console.log("adsd stt",adminremarks,status);
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const body = JSON.stringify({adminremarks,status});
        const res = await axios.post(`/api/submitLeaveStatus/${leave_id}/${id}`,body,config);
        console.log("response from the server",res.data);
        dispatch(setAlert(res.data.success[0].msg,"success"));
        history.push("/adminDashboard");
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
    }
}

export const fetchLeaveDetail = () => async dispatch => {
    try{
        const res = await axios.get(`/api/fetchLeaveHistory`);
        dispatch({
            type:FETCH_LEAVE_DETAIL,
            payload:res.data
        });
    
    }catch(err){
        console.log(err);
        const errors=err.response.data.errors;
        if(errors){

            errors.forEach((error) => {

                dispatch(setAlert(error.msg,"danger"));

            })
        }
    }
}