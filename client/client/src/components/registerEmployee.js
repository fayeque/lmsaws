import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {registerEmployee} from "../actions/adminSide"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterEmployee=(props) => {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    employeeID:"",
    department:""
  });
  const [clr,setClr] = useState(true);

  console.log("counttt")

  const {name,email,mobile,password,employeeID,department} = formData;
  const classes = useStyles();

  if(!props.adminSide.loading && props.adminSide.clear){
    console.log("it comes uptu this");
    if(clr){
    setFormData({
      name:"",
      email:"",
      mobile:"",
      password:"",
      employeeID:"",
      department:""
    })
    setClr(false)
  }
  
  }

  const onChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.registerEmployee(name,email,mobile,password,employeeID,department,props.history);
    console.log("counttt")
    console.log("clearrrr",props.adminSide.clear);
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={name}
                id="Name"
                label="Name"
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Mobile"
                value={mobile}
                label="Mobile"
                name="mobile"
                onChange={onChange}
                autoComplete="mobile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                label="Email Address"
                name="email"
                onChange={onChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={password}
                label="Password"
                type="password"
                id="password"
                onChange={onChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="employeeID"
                value={employeeID}
                label="employeeID"
                type="employeeID"
                onChange={onChange}
                id="employeeID"
                autoComplete="employeeID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="department"
                value={department}
                onChange={onChange}
                label="department"
                type="department"
                id="department"
                autoComplete="department"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => ({
  adminSide:state.adminSide
})

export default connect(mapStateToProps,{registerEmployee})(withRouter(RegisterEmployee));


