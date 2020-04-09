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
                  {["Inbox", "Starred", "Send email", "Drafts"].map(
                    (text, index) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
                      </ListItem>
                    )
                  )}
                </List>

                <List>
                  {["Personal Info", "Support Plan", "Action Plan"].map(
                    (text, index) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
                      </ListItem>
                    )
                  )}
                </List>
              </div>
            </Drawer>

            <main className={classes.content}>
              <Toolbar />
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel
              </Typography>
            </main>
          </>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
