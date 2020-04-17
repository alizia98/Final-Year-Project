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

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});
const email = "tommy@gmail.com";

export default function CustomizedTables(props: { email: string }) {
  const classes = useStyles();

  const email = props.email;

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

  if (loading === true) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Actions</StyledTableCell>
            <StyledTableCell align="center">Record Type</StyledTableCell>
            <StyledTableCell align="center">Counsellor</StyledTableCell>
            <StyledTableCell align="center">Created Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.schema_contact[0].infrm__action__cs.map(
            (row: {
              name: string;
              recordtype: { name: string };
              counsellor__c: string;
              createddate: string;
            }) => (
              // <Link key={row.id} to={"/action/" + row.id}>
              <TableRow
                key={row.name}
                hover={true}
                component={Link}
                to={"/action/" + row.name}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.recordtype.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.counsellor__c}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.createddate}
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
