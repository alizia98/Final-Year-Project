import React from "react";
import { withRouter } from "react-router";
import { Navbar, Container, Row } from "react-bootstrap";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

function Header() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Step by Step Web Portal
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );

}

export default withRouter(Header);