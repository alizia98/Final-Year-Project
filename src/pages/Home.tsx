import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { withApollo } from "@apollo/react-hoc";
// import gql from "graphql-tag";

export const personal_info = gql`
  query personal_info {
    schema_contact {
      name
      birthdate
      client_id__c
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

export default function Home() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(personal_info);

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;
  console.log(data);
  console.log("line 41 home.tsx");

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Name</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_Name_</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Email</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_Email_</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Client ID</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_ClientID_</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Support Agency Name</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_SupportAgencyName_</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Referral Date</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_Date_</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Date of Birth</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>_Date_</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
