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
  Timeline_Project: string,
  Record_Type: string,
  Counsellor: string,
  Start_Date: number
) {
  return { name, Timeline_Project, Record_Type, Counsellor, Start_Date };
}

const rows = [
  createData(
    "A-040559",
    "Surrey Counselling",
    "Counselling Action",
    "Paul harris",
    11
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
            <StyledTableCell>Action Plan</StyledTableCell>
            <StyledTableCell align="right">Timeline Project</StyledTableCell>
            <StyledTableCell align="right">Record Type</StyledTableCell>
            <StyledTableCell align="right">Counsellor</StyledTableCell>
            <StyledTableCell align="right">Start Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.Timeline_Project}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Record_Type}</StyledTableCell>
              <StyledTableCell align="right">{row.Counsellor}</StyledTableCell>
              <StyledTableCell align="right">{row.Start_Date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
