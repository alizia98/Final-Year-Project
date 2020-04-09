import React from "react";
import { withRouter } from "react-router";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

function Header() {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          Step by Step Web Portal
        </Typography>

        {!isAuthenticated && (
          <>
            <Button color="inherit" onClick={() => loginWithRedirect({})}>
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
  );
}

export default withRouter(Header);
