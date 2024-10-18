import { useState } from "react";
import {
  Box,
  AppBar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Menu,
  Inbox,
  Archive,
  Delete,
  Settings,
  Logout,
  Close,
} from "@mui/icons-material";
import { TimeIcon } from "@mui/x-date-pickers";

const drawerListData = [
  {
    name: "Schedule Messages",
    icon: <TimeIcon />,
    listLink: "/schedule",
  },
  {
    name: "Favourites",
    icon: <Inbox />,
    listLink: "/favourites",
  },
  {
    name: "Archived",
    icon: <Archive />,
    listLink: "/archived",
  },
  {
    name: "Settings",
    icon: <Settings />,
    listLink: "/settings",
  },
  {
    name: "Trash",
    icon: <Delete />,
    listLink: "/trash",
  },
  {
    name: "Logout",
    icon: <Logout />,
  },
];

const NavigationBar = () => {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              setOpenDrawer(!openDrawer);
            }}
          >
            <ListItemIcon>
              <Close />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        {drawerListData.map((item, index) => {
          return (
            <>
              <ListItem sx={{ px: 0 }} key={index}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
              {index % 2 === 0 ? <Divider /> : null}
            </>
          );
        })}
      </List>
    </Box>
  );
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="static"
        sx={{zIndex: (theme) =>theme.zIndex.drawer+1}}
        >
          <Toolbar>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <Menu sx={{ color: "#fff" }} />
            </IconButton>
            <Typography variant="h6" align="center">
              People's Messages
            </Typography>
          </Toolbar>
          <Drawer
            anchor="right"
            open={openDrawer}
            onClose={() => {
              setOpenDrawer(!openDrawer);
            }}
          >
            {DrawerList}
          </Drawer>
        </AppBar>
      </Box>
    </>
  );
};

export default NavigationBar;
