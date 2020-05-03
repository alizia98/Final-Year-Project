import React from "react";

import { MenuList, MenuItem } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { indigo } from "@material-ui/core/colors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    IndigoButton: {
      padding: theme.spacing(3),
      // paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      "&:hover": {
        backgroundColor: indigo[500],
        color: "#FFF",
      },
    },
  })
);

export default function NavigationBar() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <MenuList>
          <MenuItem
            className={classes.IndigoButton}
            component={Link}
            to="/"
            data-testid="personalInfo"
          >
            Personal Info
          </MenuItem>
          <MenuItem
            className={classes.IndigoButton}
            component={Link}
            to="/support"
            data-testid="Support_Plan"
          >
            Support Plan
          </MenuItem>
          <MenuItem
            className={classes.IndigoButton}
            component={Link}
            to="/action"
            data-testid="Action_Plan"
          >
            Action Plan
          </MenuItem>
        </MenuList>
      </div>
    </Drawer>
  );
}
