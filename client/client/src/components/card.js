import React from 'react'
import Moment from "react-moment";
import moment from "moment";
import {Link} from "react-router-dom";

import "moment-timezone";
// import { Card } from '@material-ui/core'

// let now=moment();
const Card = ({leave,side}) => {
    // console.log("leaveve",leave);

    const showStatus = (leave) => {
      if(leave.status == "Pending"){
        return <td style={{"color":"orange"}}>{leave.status}</td>
    }
    else if(leave.status == "Approved"){
      return <td style={{"color":"green"}}>{leave.status}</td>
    }
    else{
      return <td style={{"color":"red"}}>{leave.status}</td>
    }
    }
    const showst = (leave) => {
      if(leave.status == "Pending"){
          return <td style={{"color":"orange"}}>{leave.status}</td>
      }
      else if(leave.status=="Approved"){
        return  (
          <td style={{"color":"green"}}>{leave.status}
    <button className="btn btn-sm btn-primary ml-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Remarks
    </button>
  
      <p className="collapse" id="collapseExample">Admin remarks: {leave.adminRemarks}</p>
         </td>
          )
      }
      else{
        return (
          <td style={{"color":"red"}}>{leave.status}
    <button className="btn btn-sm btn-primary ml-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
      Remarks
    </button>
  
      <p className="collapse" id="collapseExample">Admin remarks: {leave.adminRemarks}</p>
         </td>
          )
      }
    }
    return (
        <div>
            {side=="employee" ? (<div>
            <div className="container">
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Leave type</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Days</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {leave.map((leave) => {
      return (
          <tr>
            <td>{leave.leaveType}</td>
            <td>{moment(leave.from).format('DD/MM/YYYY')}</td>
            <td>{moment(leave.to).format('DD/MM/YYYY')}</td>
            <td>{leave.days}</td>
            {showst(leave)}
    </tr>
      )
  })}
  </tbody>
</table>
</div>
 </div>) : 
            (<div>
              <div className="container">
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Employee Name</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Days</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {leave.map((leave) => {
      return (
          <tr>
            <td>{leave.userId.name}</td>
            <td>{moment(leave.from).format('DD/MM/YYYY')}</td>
            <td>{moment(leave.to).format('DD/MM/YYYY')}</td>
            <td>{leave.days}</td>
            {showStatus(leave)}
            <Link to={`/leaveId/${leave._id}`}><td>View Details</td></Link>
    </tr>
      )
  })}
  </tbody>
</table>
</div>

            </div>)}
        </div>
    )
}

export default Card;
