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
  name: string,
  Record_Type: string,
  Related_project: string,
  Created_Date: number,
  Created_By: string
) {
  return { name, Record_Type, Related_project, Created_Date, Created_By };
}

const rows = [
  createData(
    "PLAN-20780",
    "Homeless Outcome Star Support Plan",
    "Surrey Counselling",
    11,
    "Paul harris"
  )
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Support Plan</StyledTableCell>
            <StyledTableCell align="right">Record_Type</StyledTableCell>
            <StyledTableCell align="right">Related_project</StyledTableCell>
            <StyledTableCell align="right">Created_Date</StyledTableCell>
            <StyledTableCell align="right">Created_By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Link to="/SupportPlan">
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Record_Type}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Related_project}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Created_Date}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Created_By}
                </StyledTableCell>
              </StyledTableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
