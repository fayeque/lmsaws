import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {leaveRequest} from "../../actions/employeeSide";

const ApplyLeave = (props) => {
  const [formData,setFormData] = useState({
    to:"",
    from:"",
    startDay:"",
    endDay:"",
    remarks:"",
    leaveType:""
  });

  var startDate;
	var endDate;
	var startDay;
	var endDay;
	var d1;
  var d2;
  var days;
 
	// console.log(holidays);
	const onChange=(e) => {
		// console.log(e);
		var d1=e.target.value;
		console.log(e.target.value);
		startDate=parseDate(d1);
		startDate.setHours(0,0,0,1);
		console.log("startdate",startDate)
		startDay=startDate.getDay();
    console.log(startDay);
    setFormData({...formData,from:startDate,startDay:startDay});
	}
	const onChange2=(e) => {
		var d2=e.target.value;
		console.log(e.target.value);
		var endDate=parseDate(d2);
		endDate.setHours(23,59,59);
		console.log("end date",endDate);
		endDay=endDate.getDay();
    console.log("endDay",endDay);
    setFormData({...formData,to:endDate,endDay:endDay});
  }

   const onSubmit = (e) => {
     e.preventDefault();
    //  console.log(formData);
     var {to,endDay,from,startDay,remarks,leaveType} = formData;
    var diff=to-from;
    console.log("startDtatat",typeof(startDay));
    // console.log("endDate type",typeof(endDate));
    var mspd=86400000;
		var days=Math.ceil(diff/mspd);
		console.log(days);
		var week=Math.floor(days/7);
		days=days-2*week;
		if(startDay-endDay > 1){
			days=days-2;
		}
		if(endDay==6 && startDay != 0){
			days--;
		}
		if(endDay !=6 && startDay==0){
			days--;
    }
    var holidays=['2020-07-02','2020-07-05'];
		holidays.forEach(day => {
			if((day >= d1) && (day <= d2)){
				console.log("cpppp");
				if((parseDate(day).getDay() % 6) !=0 ){
					console.log("xghgxh");
					days--;
				}
			}
    })
    console.log("final form data",leaveType);
    props.leaveRequest(from,to,leaveType,remarks,days,props.history);
  }
		
  
  const onChange3 = (e) => {
    console.log("fdddd",formData)
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onChange4 = (e) => {
    console.log(e.target.name,e.target.value);
    setFormData({...formData,[e.target.name]:e.target.value})
  }

	function parseDate(input){
		var parts=input.match(/(\d+)/g);
		return new Date(parts[0],parts[1]-1,parts[2]);
	}
  return (
    <div className="jumbotron">
    <h3 style={{"margin-left":"40%"}}>Apply for leave</h3>
    <div className="container w-50">
      <form onSubmit={onSubmit}>
      <div className="form-group">
      <label for="exampleInputEmail1">From</label>
      <input className="form-control" type="date" name="from" onChange={onChange} />
      </div>
      <div className="form-group">
      <label for="exampleInputEmail1">To</label>
      <input className="form-control" type="date" name="to" onChange={onChange2} />
      </div>
      <div className="form-group">
      <label for="exampleInputEmail1">Leave type</label>
      <select name="leaveType" onChange={onChange4} class="browser-default custom-select">
       <option selected>Open this select menu</option>
       <option  value="Casual leave">Casual leave</option>
       <option  value="Sick leave">Sick leave</option>
       <option  value="Restricted holidays">Restricted holiday</option>
      </select>
      </div>
      <div className="form-group">
      <div class="md-form">
      <label for="form7">Employee Remarks:</label>
      <textarea id="form7" class="md-textarea form-control" name="remarks" onChange={onChange3} rows="3"></textarea>
      </div>
      </div>
      <div className="form-group">
      <button class="btn btn-primary btn-block" type="submit">Submit</button>
      </div>

      
      </form>
    </div>
    </div>
  )
}

export default connect(null,{leaveRequest})(withRouter(ApplyLeave));
