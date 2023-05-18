import React, {useState} from "react";
import {AppBar, css, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";

const App = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const styles = css`
    .root {
      width: 100vw;
      height: 100vh;
    }

    .appBar {
      backgroundColor: primary.main;
    }

    .drawer {
      width: 250px;
    }

    .listItem {
      height: 40px;
    }

    .listItemText {
      fontSize: 16px;
    }
  `;

  return (
    <div css={styles}>
      <AppBar position="static" color="primary">
        <Typography variant="h4" color="white">My App</Typography>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <i className="material-icons">menu</i>
        </IconButton>
      </AppBar>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem button key="1">
            <ListItemIcon>
              <i className="material-icons">settings</i>
            </ListItemIcon>
            <ListItemText primary="Settings"></ListItemText>
          </ListItem>
          <ListItem button key="2">
            <ListItemIcon>
              <i className="material-icons">help</i>
            </ListItemIcon>
            <ListItemText primary="Help"></ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main>
        <h1>Main content</h1>
      </main>
    </div>
  );
};

export default App;