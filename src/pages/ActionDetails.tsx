import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
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

export const actionDetailquery = gql`
  query MyQuery($actionId: String!) {
    schema_infrm__action__c(where: { name: { _eq: $actionId } }) {
      complexity_factors__c
      contextual_problems__c
      core_score_stage__c
      core_score__c
      goal_progress__c
    }
  }
`;

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  let { actionId } = useParams();

  const { loading, error, data } = useQuery(actionDetailquery, {
    variables: { actionId },
  });

  if (loading === true) {
    return <h1 data-testid="loading">Loading....</h1>;
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }

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
              <StyledTableCell align="right">Core Score Stage</StyledTableCell>
              <StyledTableCell align="right">Goal progress</StyledTableCell>
              <StyledTableCell align="right">Core score</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.schema_infrm__action__c.map(
              (row: {
                complexity_factors__c: string;
                contextual_problems__c: string;
                Core_Score_Stage: string;
                goal_progress__c: number;
                core_score__c: number;
              }) => (
                <StyledTableRow key={row.complexity_factors__c}>
                  <StyledTableCell component="th" scope="row">
                    {row.complexity_factors__c}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.contextual_problems__c}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Core_Score_Stage}
                  </StyledTableCell>
                  <StyledTableCell align="right" data-testid="text-content">
                    {row.goal_progress__c}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.core_score__c}
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
