import {combineReducers} from "redux";
import auth from "./auth";
import alert from "./alert";
import adminSide from "./adminSide";
import employeeSide from "./employeeSide";

export default combineReducers({
    auth,
    alert,
    adminSide,
    employeeSide
});