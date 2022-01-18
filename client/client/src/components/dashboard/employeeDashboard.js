import React,{useEffect,useState,Fragment} from 'react';
import {connect} from "react-redux";
import {getLeave} from "../../actions/employeeSide";
import employeeSide from '../../reducers/employeeSide';
import Card from "../card";

const EmployeeDashboard = (props) => {
    const [skip,setSkip] = useState(0);
    useEffect(() => {
        const fetchLeave = async () => {
            await props.getLeave(skip);
        }
        fetchLeave();
    },[]);


    return (
      <Fragment>
        <div className="container">
        <h4>Employee Dashboard</h4>
        <div className="d-flex">
        <div className="card mt-2 mb-4 bg-warning" style={{"width":"18rem"}}>
        <div className="card-body">
         <h5 className="card-title">Casual Leaves</h5>
            <p className="card-text">Leaves Remaining: <strong>{props.auth.user.casualLeaves}</strong></p>
            <p className="card-text">Leaves Taken: <strong>{40-props.auth.user.casualLeaves}</strong></p>
            </div>
        </div>
        <div className="card ml-4 mt-2 mb-4 bg-info" style={{"width":"18rem"}}>
        <div className="card-body">
         <h5 className="card-title">Sick Leaves</h5>
            <p className="card-text">Leaves Remaining: <strong>{props.auth.user.sickLeaves}</strong></p>
            <p className="card-text">Leaves Taken: <strong>{15-props.auth.user.sickLeaves}</strong></p>
            </div>
        </div>
        <div className="card ml-4 mt-2 mb-4 bg-primary" style={{"width":"18rem"}}>
        <div className="card-body">
         <h5 className="card-title">Restricted Holidays</h5>
            <p className="card-text">Leaves Remaining: <strong>{props.auth.user.restrictedHolidays}</strong></p>
            <p className="card-text">Leaves Taken: <strong>{2-props.auth.user.restrictedHolidays}</strong></p>
            </div>
        </div>
        </div>

            
            {props.leaveDetail.loading ? <div class="spinner-border mt-5 ml-5" role="status">
  <span class="sr-only">Loading...</span>
</div> :  <Card leave={props.leaveDetail.leave} side="employee" />
 }
           </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    leaveDetail:state.employeeSide,
    auth:state.auth
  })

export default connect(mapStateToProps,{getLeave})(EmployeeDashboard);
