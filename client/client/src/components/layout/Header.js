import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import {withRouter,Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/auth"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/adminLogin");
  }

  const onClick2 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/employeeLogin");
  }

  const onClick3 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/applyLeave");
  }
  const onClick4 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/seeHistory");
  }
  const onClick5 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/registerEmployee");
  }
  const onClick6 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.history.push("/showHistory");
  }
  const onClick7 = (e) => {
    e.preventDefault();
    handleDrawerClose();
    props.logout(props.history);
  }
//   if(!props.auth.loading){
//   if(props.auth.isAuthenticated && (props.auth.user.role==1)){
//     return <Redirect to="/adminDashboard"></Redirect>
//   }

//   if(props.auth.isAuthenticated && (props.auth.user.role==0)){
//     return <Redirect to="/userDashboard"></Redirect>
//   }

// }

const showMenus = () => {
  if(!props.auth.loading){
  if(props.auth.isAuthenticated && props.auth.user.role==1){
   return  (<List>
      <ListItem button key="Register Employee" onClick={onClick5}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Register Employee" />
          </ListItem>
      <ListItem button key="Show History" onClick={onClick6}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Show History" />
          </ListItem>
          <ListItem button key="Logout" onClick={onClick7}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
      </List>)
  }else if(props.auth.isAuthenticated && props.auth.user.role==0){
    return (<List>
      <ListItem button key="Apply for Leave" onClick={onClick3}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Apply for Leave" />
          </ListItem>
      <ListItem button key="See history" onClick={onClick4}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="See history" />
          </ListItem>
          <ListItem button key="Logout" onClick={onClick7}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
      </List>)
  }else{
   return <List>
      <ListItem button key="Admin Login" onClick={onClick}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Admin Login" />
          </ListItem>
      <ListItem button key="Employee Login" onClick={onClick2}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Employee Login" />
          </ListItem>
      </List>
  }
  }
}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
           <Link to="/" style={{color:"#fff"}}>{props.auth.user == null ? "Welcome" : "Hii!"}</Link> 
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
           Welcome to leave management system
        </Typography>

      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        {showMenus()}
      </Drawer>
    </div>
  );
}
const mapStateToProps = state => ({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(withRouter(Navbar));

// export default withRouter(Navbar);