import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const personalInfoquery = gql`
  query Personalinfo($email: String!) {
    schema_contact(where: { email: { _eq: $email } }) {
      name
      birthdate
      client_id__c
      infrm__referral_date__c
      email
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function Home(props: { email: string }) {
  const email = props.email;
  const classes = useStyles();
  const { loading, error, data } = useQuery(personalInfoquery, {
    variables: { email },
  });

  if (loading === true) {
    return <div data-testid="loading">Loading...</div>;
  }
  if (error) {
    return <h1> Got back error : {error}</h1>;
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Name</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>{data.schema_contact[0].name}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Email</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {data.schema_contact[0].email}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Client ID</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {data.schema_contact[0].client_id__c}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Date of Birth</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {data.schema_contact[0].birthdate}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Referral Date</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {data.schema_contact[0].infrm__referral_date__c}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
