import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";

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

export default function MapsPage() {
  const classes = useStyles();
  return <div>hello maps</div>;
}
