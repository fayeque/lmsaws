import React,{useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {getLeaveDetail} from "../../actions/adminSide";
import {connect} from "react-redux";
import ShowLeaveDetail from "./ShowLeaveDetail";


const LeaveDetail = (props) => {
    var leave_id=props.match.params.leave_id
    useEffect(() => {
        props.getLeaveDetail(leave_id);
    },[props.getLeaveDetail,props.match.params.leave_id]);
    return (
        <div>
            Hiii
            {props.leaveDetail.leavedetail == null ? <div class="spinner-border mt-5 ml-5" role="status">
  <span class="sr-only">Loading...</span>
</div>: <ShowLeaveDetail leaveDetail={props.leaveDetail.leavedetail}/>}
        </div>
    )
}

const mapStateToProps = state => ({
    leaveDetail:state.adminSide
  })

export default connect(mapStateToProps,{getLeaveDetail})(withRouter(LeaveDetail));
