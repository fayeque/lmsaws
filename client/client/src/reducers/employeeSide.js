import {GET_LEAVE,GET_LEAVE_ERROR} from "../actions/types";

const initialState={
    leave:[],
    error:"",
    loading:true
}
export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case GET_LEAVE:
        return {
            ...state,
            leave:payload,
            loading:false
        }
        case GET_LEAVE_ERROR:
            return {
                ...state,
                error:payload,
                loading:false
            }
        default: return state
    }
}