import React from "react";
import {
  MenuItem,
  MenuList,
  Card,
  CardContent,
  makeStyles,
  Button,
  Theme,
  createStyles
} from "@material-ui/core";
import { width } from "@material-ui/system";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paddingbutton: {
      padding: theme.spacing(3),
      width: "100%"
    },
    paddingDiv: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(1)
    }
  })
);

export default function SupportPage() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.paddingDiv}>
        <Button
          className={classes.paddingbutton}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          Support Plan 1
        </Button>
      </div>
      <div className={classes.paddingDiv}>
        <Button
          className={classes.paddingbutton}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
        >
          Support Plan 2
        </Button>
      </div>
    </div>
  );
}
