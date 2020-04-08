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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';


const drawerWidth = 240;

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
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));
  

function Header() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Step by Step Web Portal
          </Typography>

          {!isAuthenticated && (
              <>
                <Button color="inherit"
                  onClick={() => loginWithRedirect({})}
                >
                  Log in
                </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button color="inherit" onClick={() => logout()}>
                  Log out
                </Button>
                </>
             )}
        </Toolbar>
      </AppBar>
      
      

        {isAuthenticated && (
          <>
          <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          >
            <Toolbar/>
            <div className={classes.drawerContainer}>
            <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
              ))}


              </List>

              <List>
              {['Personal Info', 'Support Plan', 'Action Plan'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel
          </Typography>
          </main>
          
        </>
      )}

    </div>
  );

}

export default withRouter(Header);