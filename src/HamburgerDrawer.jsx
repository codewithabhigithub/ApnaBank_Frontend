import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu"; // added

import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core"; // added

import categories from "../data/category";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  list: {
    width: 200, // changed
    paddingLeft: 10, // changed
    paddingRight: 5, //changed
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer({ setCategory }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  //---------------------------------------------------
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  //----------------------------------------------------

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ color: 'whitesmoke', backgroundColor: '#861f41' }}  >
        <ListItem>Categories</ListItem>
      </List>
      <Divider />
      <List style={{ color: 'whitesmoke', backgroundColor: '#861f41' }} >
        {categories.map((text, index) => (
          <ListItem
            style={{ height: 70, borderRadius: 3, color: 'whitesmoke', backgroundColor: '#861f41'  }}
            button
            onClick={() => setCategory(text)}
            key={text}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        {/* added icon */}
        <MenuIcon />
      </Button>
      {/* added */}
      <ThemeProvider theme={theme}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </ThemeProvider>
    </div>
  );
}
