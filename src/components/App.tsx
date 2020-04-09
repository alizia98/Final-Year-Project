import React, { useState } from "react";
import "../styles/App.css";
import Header from "./header";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { useAuth0 } from "../auth/react-auth0-wrapper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// for apollo client
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { CssBaseline } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "../pages/Home";
import ActionPage from "../pages/Action";
import MapsPage from "../pages/Maps";
import SupportPage from "../pages/Support";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

function App() {
  // for apollo client
  const httpLink = new HttpLink({
    uri: "https://ymj-hasura.herokuapp.com/v1/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const classes = useStyles();
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Header />

          {isAuthenticated && (
            <>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <Toolbar />
                <div className={classes.drawerContainer}>
                  <List>
                    <ListItem button>
                      <Link to="/">
                        <ListItemText primary={"Personal Info"} />
                      </Link>
                    </ListItem>

                    <ListItem button>
                      <Link to="/support">
                        <ListItemText primary={"Support Plan"} />
                      </Link>
                    </ListItem>

                    <ListItem button>
                      <Link to="/action">
                        <ListItemText primary={"Action Plan"} />
                      </Link>
                    </ListItem>

                    <ListItem button>
                      <Link to="/maps">
                        <ListItemText primary={"Maps"} />
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </Drawer>

              <main className={classes.content}>
                <Toolbar />
                <Switch>
                  <Route exact={true} path="/">
                    <HomePage />
                  </Route>
                  <Route path="/action">
                    <ActionPage />
                  </Route>
                  <Route path="/support">
                    <SupportPage />
                  </Route>
                  <Route path="/maps">
                    <MapsPage />
                  </Route>
                </Switch>

                {/* <Typography paragraph>hello world</Typography> */}
              </main>
            </>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
