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
  Priority_Area: string,
  Action: string,
  By_Whom: string,
  target_date: number,
  completed_date: number,
  Status_of_completion: string
) {
  return {
    Priority_Area,
    Action,
    By_Whom,
    target_date,
    completed_date,
    Status_of_completion
  };
}

const rows = [
  createData(
    "DRUG AND ALCOHOL MISUSE",
    "Test Test Test Test Test",
    "Test Test Test Test Test",
    1,
    1,
    "yes"
  )
];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();

  let { actionId } = useParams();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Priority Area</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
            <StyledTableCell align="right">By whom</StyledTableCell>
            <StyledTableCell align="right">Target date</StyledTableCell>
            <StyledTableCell align="right">Completed date</StyledTableCell>
            <StyledTableCell align="right">
              Status of completion
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.Priority_Area}>
              <StyledTableCell component="th" scope="row">
                {row.Priority_Area}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Action}</StyledTableCell>
              <StyledTableCell align="right">{row.By_Whom}</StyledTableCell>
              <StyledTableCell align="right">{row.target_date}</StyledTableCell>
              <StyledTableCell align="right">
                {row.completed_date}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.Status_of_completion}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
