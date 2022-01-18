import React,{useEffect,useState,Fragment} from 'react';
import {connect} from "react-redux";
import {getLeaveRequest} from "../../actions/adminSide";
import adminSide from '../../reducers/adminSide';
import Card from "../card";

const AdminDashboard = (props) => {
    const [skip,setSkip] = useState(0);
    useEffect(() => {
      props.getLeaveRequest(skip);

    },[props.getLeaveRequest]);


    return (
      <Fragment>
            
            {props.leaveDetail.loading ? <div class="spinner-border mt-5 ml-5" role="status">
  <span class="sr-only">Loading...</span>
</div> :  <Card leave={props.leaveDetail.leave} side="admin" />
 }
        </Fragment>
    )
}

const mapStateToProps = state => ({
    leaveDetail:state.adminSide,
    auth:state.auth
  })

export default connect(mapStateToProps,{getLeaveRequest})(AdminDashboard);
