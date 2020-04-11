import React from "react";
import {
  MenuItem,
  MenuList,
  Card,
  CardContent,
  makeStyles,
  Button,
  Theme,
  createStyles,
  Paper,
  Grid
} from "@material-ui/core";
import { width, height } from "@material-ui/system";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paddingbutton: {
      padding: theme.spacing(3),
      width: "100%"
    },
    paddingDiv: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(1)
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

export default function ActionPage() {
  const classes = useStyles();
  return (
    <Card className={classes.paddingbutton} variant="outlined">
      <CardContent>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs>
              Action AutoNumber
            </Grid>
            <Grid item xs>
              Record Type
            </Grid>
            <Grid item xs>
              Councelor
            </Grid>
            <Grid item xs>
              Created Date
            </Grid>
            <Grid item xs>
              Created By
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}
