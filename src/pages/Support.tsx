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
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { indigo } from "@material-ui/core/colors";

export const listOfSupportPlans = gql`
  query listOfSupportPlans {
    schema_infrm__supportplan__c {
      name
      recordtype {
        name
      }
      createddate
      user_to_supportplan {
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

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(listOfSupportPlans);

  if (error) {
    return <h1> Got back error : {error}</h1>;
  }
  if (loading == true) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Support Plan</StyledTableCell>
            <StyledTableCell align="center">Record Type</StyledTableCell>
            <StyledTableCell align="center">Created Date</StyledTableCell>
            <StyledTableCell align="center">Created By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.schema_infrm__supportplan__c.map(
            (row: {
              name: string;
              recordtype: { name: string };
              createddate: string;
              user_to_supportplan: { name: string };
            }) => (
              // <Link to={"/support/" + row.name}>
              <TableRow
                key={row.name}
                // selected={true}
                hover={true}
                component={Link}
                to={"/support/" + row.name}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.recordtype.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.createddate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.user_to_supportplan.name}
                </StyledTableCell>
              </TableRow>
              // </Link>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
