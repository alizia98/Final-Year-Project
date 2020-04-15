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
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

// export const listOfSupportPlans = gql`
//   query MyQuery($supportId: String!)) {
//     schema_infrm__action__c(where: { name: { _eq: $supportId } }) {
//       complexity_factors__c
//       contextual_problems__c
//       core_score_stage__c
//       core_score__c
//       goal_progress__c
//     }
//   }
// `;

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
  Complexity_factors: string,
  Contextual_problems: string,
  Core_Score_Stage: string,
  Goal_progress: number,
  Core_score: number
) {
  return {
    Complexity_factors,
    Contextual_problems,
    Core_Score_Stage,
    Goal_progress,
    Core_score
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  let { actionId } = useParams();
  console.log(actionId);

  const { loading, error, data } = useQuery(
    gql`
      query MyQuery($actionId: String!) {
        schema_infrm__action__c(where: { name: { _eq: $actionId } }) {
          complexity_factors__c
          contextual_problems__c
          core_score_stage__c
          core_score__c
          goal_progress__c
        }
      }
    `,
    { variables: { actionId } }
  );

  // console.log(loading, error, data);
  // console.log(data.schema_infrm__action__c[0].Core_Score_Stage);

  if (loading == false) {
    const rows = [
      createData(
        data.schema_infrm__action__c[0].complexity_factors__c,
        data.schema_infrm__action__c[0].contextual_problems__c,
        data.schema_infrm__action__c[0].Core_Score_Stage,
        data.schema_infrm__action__c[0].goal_progress__c,
        data.schema_infrm__action__c[0].core_score__c
      )
    ];

    return (
      <div>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <h1>Action Plan: {actionId}</h1>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/action"
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Complexity factors</StyledTableCell>
                <StyledTableCell align="right">
                  Contextual problems
                </StyledTableCell>
                <StyledTableCell align="right">
                  Core Score Stage
                </StyledTableCell>
                <StyledTableCell align="right">Goal progress</StyledTableCell>
                <StyledTableCell align="right">Core score</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <StyledTableRow key={row.Complexity_factors}>
                  <StyledTableCell component="th" scope="row">
                    {row.Complexity_factors}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Contextual_problems}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Core_Score_Stage}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Goal_progress}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Core_score}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <div>loading....</div>;
  }
}
