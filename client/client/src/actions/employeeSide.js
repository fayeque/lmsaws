import axios from "axios";
import {LEAVE_REQ_SUCCESS,GET_LEAVE_ERROR,GET_LEAVE} from "./types";
import { setAlert } from "./alert";

export const leaveRequest = (from,to,leaveType,remarks,days,history) => async dispatch => {
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({from,to,leaveType,remarks,days});
    try{
    const res=await axios.post("/api/leaveRequest",body,config);
    dispatch(setAlert(res.data.success[0].msg,"success"));
    history.push("/employeeDashboard");
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

export const getLeave = (skip) => async dispatch => {
    try{
        const res = await axios.get(`/api/getLeave?skip=${skip}`);
        dispatch({
            type:GET_LEAVE,
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