import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Header';
import Landing from './components/layout/Landing';
import AdminLogin from './components/auth/adminLogin';
import EmployeeLogin from './components/auth/employeeLogin';
import Register from './components/auth/Register';
import Alert from './components/layout/alert';
import AdminDashboard from './components/dashboard/adminDashboard';
import EmployeeDashboard from './components/dashboard/employeeDashboard';
import PrivateRoute from "./components/routing/Private";
import LeaveDetail from "./components/admin/LeaveDetail";
import ApplyLeave from './components/employee/applyLeave';
import RegisterEmployee from './components/registerEmployee';
import ShowHistory from "./components/admin/showHistory";
import EmpDetail from "./components/admin/empDetail";

import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App =() => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Alert />
            <Switch>
              <Route path="/register" exact component={Register} />
              <Route path="/adminLogin" exact component={AdminLogin} />
              <Route path="/adminDashboard" exact component={AdminDashboard} />
              <Route  path="/leaveId/:leave_id"  exact component={LeaveDetail} />
              <Route  path="/showHistory"  exact component={ShowHistory} />
              <Route  path="/emp/:id"  exact component={EmpDetail} />
              <PrivateRoute path="/employeeDashboard" exact component={EmployeeDashboard} />
              <Route path="/employeeLogin" exact component={EmployeeLogin} />
              <PrivateRoute path="/registerEmployee" exact component={RegisterEmployee} />
              <PrivateRoute path="/applyLeave" exact component={ApplyLeave} />
            </Switch>
          </Fragment>
        </Router>
    </Provider>
  );
}

export default App;
