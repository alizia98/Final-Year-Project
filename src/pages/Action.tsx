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

// export const listOfSupportPlans = gql`
//   query listOfSupportPlans {
//     schema_infrm__supportplan__c {
//       name
//       recordtype {
//         name
//       }
//       createddate
//       user_to_supportplan {
//         name
//       }
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
  id: string,
  name: string,
  Record_Type: string,
  Counsellor: string,
  createddate: number
) {
  return { id, name, Record_Type, Counsellor, createddate };
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
const email = "tommy@gmail.com";

export default function CustomizedTables() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(
    gql`
      query MyQuery($email: String!) {
        schema_contact(where: { email: { _eq: $email } }) {
          infrm__action__cs {
            name
            recordtype {
              name
            }
            createddate
            counsellor__c
          }
        }
      }
    `,
    { variables: { email } }
  );
  // console.log(loading, error, data);

  if (loading == false) {
    const rows = [
      createData(
        data.schema_contact[0].infrm__action__cs[0].name,
        data.schema_contact[0].infrm__action__cs[0].name,
        data.schema_contact[0].infrm__action__cs[0].recordtype.name,
        data.schema_contact[0].infrm__action__cs[0].counsellor__c,
        data.schema_contact[0].infrm__action__cs[0].createddate
      )
    ];

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell align="right">Record Type</StyledTableCell>
              <StyledTableCell align="right">Counsellor</StyledTableCell>
              <StyledTableCell align="right">Created Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Link key={row.id} to={"/action/" + row.id}>
                <StyledTableRow key={row.name} selected={true}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Record_Type}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.Counsellor}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.createddate}
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
