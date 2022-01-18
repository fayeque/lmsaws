import {EMP_REG_SUCCESS,GET_LEAVE_REQUEST,GET_LEAVE_DETAIL,FETCH_LEAVE_DETAIL,FETCH_EMP_SUCCESS} from "../actions/types";

const initialState={
    clear:false,
    leavedetail:null,
    loading:true,
    leave:[],
    leaveHistory:[],
    error:"",
    emp:[]
}
export default function(state=initialState,action){
    const {type,payload} = action;
    switch(type){
        case EMP_REG_SUCCESS:
        return {
            ...state,
            clear:payload,
            loading:false
        };
        case GET_LEAVE_REQUEST:
            return {
                ...state,
                leave:payload,
                loading:false
            };
        case GET_LEAVE_DETAIL:
            return {
                ...state,
                leavedetail:payload,
                loading:false
            }
        case FETCH_LEAVE_DETAIL:
            return {
                ...state,
                leaveHistory:payload,
                loading:false
            }
        case FETCH_EMP_SUCCESS:
            return {
                ...state,
                loading:false,
                emp:payload
            }
        default: return state
    }
}