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

function createData(
  id: string,
  name: string,
  Record_Type: string,
  Created_Date: number,
  Created_By: string
) {
  return {
    name,
    id,
    Record_Type,
    Created_Date,
    Created_By
  };
}

// const rows = [
//   createData(
//     255,
//     "PLAN-20780",
//     "Homeless Outcome Star Support Plan",
//     "Surrey Counselling",
//     11,
//     "Paul harris"
//   )
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(listOfSupportPlans);
  // console.log(loading, error, data);

  if (loading == false) {
    const rows = [
      createData(
        data.schema_infrm__supportplan__c[0].name,
        data.schema_infrm__supportplan__c[0].name,
        // "Homeless Outcome Star Support Plan",
        data.schema_infrm__supportplan__c[0].recordtype.name,
        data.schema_infrm__supportplan__c[0].createddate,
        data.schema_infrm__supportplan__c[0].user_to_supportplan.name
      ),
      createData(
        data.schema_infrm__supportplan__c[1].name,
        data.schema_infrm__supportplan__c[1].name,
        // "Homeless Outcome Star Support Plan",
        data.schema_infrm__supportplan__c[1].recordtype.name,
        data.schema_infrm__supportplan__c[1].createddate,
        data.schema_infrm__supportplan__c[1].user_to_supportplan.name
      )
    ];

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Support Plan</StyledTableCell>
              <StyledTableCell align="right">Record_Type</StyledTableCell>
              <StyledTableCell align="right">Created_Date</StyledTableCell>
              <StyledTableCell align="right">Created_By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Link key={row.id} to={"/support/" + row.id}>
                <StyledTableRow key={row.name} selected={true} hover={true}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Record_Type}
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
  } else {
    return <div>Loading...</div>;
  }
}
