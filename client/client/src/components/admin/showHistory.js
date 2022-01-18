import React,{useEffect,useRef,Fragment} from 'react'
import {fetchLeaveDetail,fetchEmp} from "../../actions/adminSide";

import {connect} from "react-redux";
import {withRouter,Link} from "react-router-dom";
import Card from "../card";

const ShowHistory = ({fetchLeaveDetail,lh,fetchEmp,em}) => {
    const name = useRef("");
    useEffect(() => {
        fetchLeaveDetail()
    },[]);
    // console.log(lh);
    const showEmpname = (em) => {
        return em.map((e,i) => {
            if(i%2==0){
                return <Link to={`/emp/${e._id}`}><div style={{"background-color":"grey",color:"white","padding":"5px"}}>{e.name}</div></Link>
            }else{
                return <Link to={`/emp/${e._id}`} > <div style={{"background-color":"white",color:"black","padding":"5px"}}>{e.name}</div></Link>
            }
            
        })
    }
    let timerId=null;
    const onChange = (e) => {
        name.current=e.target.value;
        if(timerId){
            clearTimeout(timerId);
            console.log("timerid iss",timerId);
        }
        timerId=setTimeout(() => {
            console.log("coming here");
            console.log("name",name.current);
            fetchEmp(name.current);
        },1000);
        // setName(e.target.value);
    }
    return (
    <Fragment>
 <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input autoComplete="off" onChange={onChange} className="search_input" type="text" name="name" placeholder="Search..." />
          <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
        </div>
      </div>
    </div>
    {em.length > 0 ? (
        <div className="container" style={{"margin-left":"20%","padding":"10px","width":"80vh","border-radius":"10%"}}>
            {showEmpname(em)}
           
        </div>
    ) : ""}
        <div style={{"margin-top":"20px"}}>
        <Card leave={lh} side="admin" />
        </div>
    </Fragment>
    )
}

const mapStateToProps = state => ({
    lh:state.adminSide.leaveHistory,
    em:state.adminSide.emp
})

export default connect(mapStateToProps,{fetchLeaveDetail,fetchEmp})(withRouter(ShowHistory));
