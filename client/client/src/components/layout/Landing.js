import React from 'react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Landing = ({auth}) => {
    return (
        
        <div>
        {auth.isAuthenticated && auth.user.role == 1 ? <Redirect to="/adminDashboard" /> : <Redirect to="/employeeDashboard" />}
            <div className="container">
                Landing page
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    auth:state.auth
  })
  
  export default connect(mapStateToProps)(Landing);
