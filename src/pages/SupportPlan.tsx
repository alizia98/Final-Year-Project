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
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Divider, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Radar } from "react-chartjs-2";

export const supportPlanQuery = gql`
  query MyQuery($supportId: String!) {
    schema_contact {
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
        infrm__x1_motivation_taking_responsibility_staf__c
        infrm__x2_self_care_living_skills_staff__c
        infrm__x3_managing_money_staff__c
        infrm__x4_social_networks_relationships_staff__c
        infrm__x5_score5_drug_alcohol_misuse_staff__c
        infrm__x6_physical_health_staff__c
        infrm__x7_emotional_mental_health_staff__c
        infrm__x8_meaningful_use_time_staff__c
        infrm__x9_managing_tenancy_accommodation_staff__c
        infrm__x10_offending_staff__c
        infrm__priority_area__c
        infrm__priority_area_1_action__c
        infrm__priority_area_1_target_date__c
        infrm__priority_area_1_completed_date__c
        infrm__priority_1_was_it_done__c
        infrm__priority_area_1_who__c
        infrm__priority_area_2__c
        infrm__priority_area_2_action__c
        infrm__priority_area_2_by_who__c
        infrm__priority_area_2_completed_date__c
        infrm__priority_area_2_target_date__c
        infrm__priority_2_action_was_it_done__c
        infrm__priority_area_3__c
        infrm__priority_area_3_action__c
        infrm__priority_area_3_by_who__c
        infrm__priority_area_3_completed_date__c
        infrm__priority_area_3_target_date__c
        infrm__pr__c
        infrm__priority_area_4__c
        infrm__priority_area_4_action__c
        infrm__priority_area_4_by_who__c
        infrm__priority_area_4_completed_date__c
        infrm__priority_area_4_target_date__c
        infrm__priority_4_action_was_it_done__c
      }
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
    No_Longer_Relevant,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      marginBottom: "50px",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    div_spacing: {
      paddingTop: theme.spacing(2),
    },
  })
);

export default function SupportPlan() {
  const classes = useStyles();
  let { supportId } = useParams();

  const { loading, error, data } = useQuery(supportPlanQuery, {
    variables: { supportId },
  });

  if (error) {
    return <h1> Got back error : {error}</h1>;
  }

  if (loading === true) {
    return <h1 data-testid="loading">Loading...</h1>;
  }

  if (
    data.schema_contact[0].infrm__supportplan__cs[0].infrm__priority_area__c ==
    null
  ) {
    const rows = [
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as1__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as1__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as1__c.toString()
      ),
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as2__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as2__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as2__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as2__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as2__c.toString()
      ),
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as3__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as3__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as3__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as3__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as3__c.toString()
      ),
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as4__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as4__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as4__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as4__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as4__c.toString()
      ),
      createData(
        data.schema_contact[0].infrm__supportplan__cs[0].action_set_as5__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .to_be_completed_by_as5__c,
        data.schema_contact[0].infrm__supportplan__cs[0]
          .actual_date_of_completion_as5__c,
        data.schema_contact[0].infrm__supportplan__cs[0].not_completed_as5__c.toString(),
        data.schema_contact[0].infrm__supportplan__cs[0].no_longer_relevant_as5__c.toString()
      ),
    ];

    return (
      <div>
        <div>
          <Grid container spacing={3} alignContent="center">
            <Grid item xs={9}>
              <h1 data-testid="text-content">Support Plan: {supportId}</h1>
            </Grid>
            <Grid item xs={3} alignItems="center">
              <div className={classes.div_spacing}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/support"
                >
                  Back
                </Button>
              </div>
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
              {rows.map((row) => (
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
    const chart_data = {
      labels: [
        "Motivation taking responsibility",
        "Managing money staff",
        "Social networks relationships",
        "Self care living skills staff",
        "Score drug alcohol misuse",
        "Physical health staff",
        "Emotional mental health staff",
        "Meaningful use time staff",
        "Managing tenancy accommodation staff",
        "Offending staff",
      ],
      datasets: [
        {
          label: "",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x1_motivation_taking_responsibility_staf__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x2_self_care_living_skills_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x3_managing_money_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x4_social_networks_relationships_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x5_score5_drug_alcohol_misuse_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x6_physical_health_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x7_emotional_mental_health_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x8_meaningful_use_time_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x9_managing_tenancy_accommodation_staff__c.charAt(
              0
            ),
            data.schema_contact[0].infrm__supportplan__cs[0].infrm__x10_offending_staff__c.charAt(
              0
            ),
          ],
        },
      ],
    };

    return (
      <div>
        <div>
          <Grid container spacing={3} alignContent="center">
            <Grid item xs={9}>
              <h1>Support Plan: {supportId}</h1>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.div_spacing}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/support"
                >
                  Back
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>

        <Paper className={classes.root}>
          <h2>Star Chart</h2>
          <Radar data={chart_data} />
        </Paper>

        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Prioity Area</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                  <StyledTableCell align="center">By Whom</StyledTableCell>
                  <StyledTableCell align="center">Target Date</StyledTableCell>
                  <StyledTableCell align="center">
                    Completed Date
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Completion Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_1_action__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_1_who__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_1_target_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_1_completed_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_1_was_it_done__c
                    }
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_2__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_2_action__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_2_by_who__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_2_target_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_2_completed_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_2_action_was_it_done__c
                    }
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_3__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_3_action__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_3_by_who__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_3_target_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_3_completed_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__pr__c
                    }
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_4__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_4_action__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_4_by_who__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_4_target_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_area_4_completed_date__c
                    }
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {
                      data.schema_contact[0].infrm__supportplan__cs[0]
                        .infrm__priority_4_action_was_it_done__c
                    }
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
