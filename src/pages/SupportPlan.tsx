import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Divider, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

export const listOfSupportPlans = gql`
  query MyQuery {
    schema_contact(where: { email: { _eq: "tommy@gmail.com" } }) {
      infrm__supportplan__cs {
        action_set_as1__c
        action_set_as2__c
        action_set_as3__c
        action_set_as4__c
        action_set_as5__c
        to_be_completed_by_as1__c
        to_be_completed_by_as2__c
        to_be_completed_by_as3__c
        to_be_completed_by_as4__c
        to_be_completed_by_as5__c
        actual_date_of_completion_as1__c
        actual_date_of_completion_as2__c
        actual_date_of_completion_as3__c
        actual_date_of_completion_as4__c
        actual_date_of_completion_as5__c
        not_completed_as1__c
        not_completed_as2__c
        not_completed_as3__c
        not_completed_as4__c
        not_completed_as5__c
        no_longer_relevant_as1__c
        no_longer_relevant_as2__c
        no_longer_relevant_as3__c
        no_longer_relevant_as4__c
        no_longer_relevant_as5__c
        name
      }
    }
  }
`;

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  })
)(TableRow);

function createData(
  Action_Set: string,
  To_be_completed_by: Date,
  Actual_Date_of_completion: Date,
  Not_Completed: string,
  No_Longer_Relevant: string
) {
  return {
    Action_Set,
    To_be_completed_by,
    Actual_Date_of_completion,
    Not_Completed,
    No_Longer_Relevant
  };
}

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700
//   }
// });
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700
    },
    root: {
      flexGrow: 1
    }
  })
);

export default function CustomizedTables() {
  const classes = useStyles();
  let { supportId } = useParams();
  // console.log("fetching id: " + supportId);

  const { loading, error, data } = useQuery(
    gql`
      query MyQuery($supportId: String!) {
        schema_contact(where: { email: { _eq: "tommy@gmail.com" } }) {
          infrm__supportplan__cs(where: { name: { _eq: $supportId } }) {
            action_set_as1__c
            action_set_as2__c
            action_set_as3__c
            action_set_as4__c
            action_set_as5__c
            to_be_completed_by_as1__c
            to_be_completed_by_as2__c
            to_be_completed_by_as3__c
            to_be_completed_by_as4__c
            to_be_completed_by_as5__c
            actual_date_of_completion_as1__c
            actual_date_of_completion_as2__c
            actual_date_of_completion_as3__c
            actual_date_of_completion_as4__c
            actual_date_of_completion_as5__c
            not_completed_as1__c
            not_completed_as2__c
            not_completed_as3__c
            not_completed_as4__c
            not_completed_as5__c
            no_longer_relevant_as1__c
            no_longer_relevant_as2__c
            no_longer_relevant_as3__c
            no_longer_relevant_as4__c
            no_longer_relevant_as5__c
            name
          }
        }
      }
    `,
    { variables: { supportId } }
  );
  // console.log(loading, error, data);

  if (loading == false) {
    const rows = [
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as1__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as1__c.toString()
      )
    ];

    return (
      <div>
        <div>
          <Grid container spacing={3} alignContent="center">
            <Grid item xs={9}>
              <h1>Support Plan: {supportId}</h1>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/support"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Action Set</StyledTableCell>
                <StyledTableCell align="center">
                  To be completed by
                </StyledTableCell>
                <StyledTableCell align="center">
                  Actual Date of completion
                </StyledTableCell>
                <StyledTableCell align="center">Not Completed</StyledTableCell>
                <StyledTableCell align="center">
                  No Longer Relevant
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.Action_Set}>
                  <StyledTableCell component="th" scope="row">
                    {row.Action_Set}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.To_be_completed_by}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Actual_Date_of_completion}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.Not_Completed}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.No_Longer_Relevant}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
}
