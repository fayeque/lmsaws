import React, { useState } from 'react';
import {submitLeaveStatus} from "../../actions/adminSide";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from "moment";

const ShowLeaveDetail = (props) => {
    const [adminRemarks,setAdminRemarks] = useState({
        adminremarks:"",
        status:""
    });
    const {adminremarks,status} = adminRemarks;
    const onChange = (e) => {
        console.log(e.target.name);
        setAdminRemarks({...adminRemarks,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("formadaaaaa",adminRemarks);
        props.submitLeaveStatus(adminremarks,status,props.history,props.leaveDetail._id,props.leaveDetail.userId._id);
    }
    return (
        <div>
            <h4 class="ml-5">Leave detail</h4>
                <div className="container">
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Department</th>
      <th scope="col">EmployeeID</th>
      <th scope="col">Mobile</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{props.leaveDetail.userId.name}</td>
      <td>{props.leaveDetail.userId.department}</td>
      <td>{props.leaveDetail.userId.employeeID}</td>
      <td>{props.leaveDetail.userId.mobile}</td>
    </tr>
    </tbody>
    <thead>
    <tr>
      <th scope="col">Leave Type</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Days</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{props.leaveDetail.leaveType}</td>
      <td>{moment(props.leaveDetail.from).format('DD/MM/YYYY')}</td>
      <td>{moment(props.leaveDetail.to).format('DD/MM/YYYY')}</td>
      <td>{props.leaveDetail.days}</td>
    </tr>
    </tbody>
    <thead>
    <tr>
      <th scope="col">Leave Remaining</th>
    </tr>
    <tr>
    <th scope="col">Casual Leaves </th>
      <th scope="col">Sick Leave </th>
      <th scope="col">Restricted Holidays</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{props.leaveDetail.userId.casualLeaves}</td>
      <td>{props.leaveDetail.userId.medicalLeaves}</td>
      <td>{props.leaveDetail.userId.restrictedHolidays}</td>
      <td>{props.leaveDetail.userId.email}</td>
    </tr>
  </tbody>
  <thead>
      <tr>
          <th>Employee Remarks</th>
      </tr>
  </thead>
  <tbody>
      <tr>
      {props.leaveDetail.remarks}
      </tr>
  </tbody>
</table>
<form onSubmit={onSubmit} className="form-control">
<div className="form-group">
      <div class="md-form">
      <label for="form7">Admin Remarks:</label>
      <textarea id="form7" class="md-textarea form-control" onChange={onChange} name="adminremarks" rows="3"></textarea>
      </div>
    </div>
    <div className="form-group">
      <select name="status" onChange={onChange} class="browser-default custom-select">
      <option>Select</option>
       <option value="Approved">Approved</option>
       <option value="Cancel">Cancel</option>
      </select>
      </div>
      <div className="form-group">
      <button class="btn btn-primary btn-block" type="submit">Submit</button>
      </div>
</form>

                </div>
              </div>

    )
}

export default connect(null,{submitLeaveStatus})(withRouter(ShowLeaveDetail));