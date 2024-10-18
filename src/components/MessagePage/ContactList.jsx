import { AccountCircleOutlined } from "@mui/icons-material";
import { AccountCircle } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Toolbar,
  ListItemButton,
  ListItemIcon,
  Avatar,
} from "@mui/material";

const ContactList = () => {
  return (
    <>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{ bgcolor: "primary.main" }}
                    alt="username"
                    src="/2.jpg"
                  ></Avatar>
                </ListItemIcon>
                <ListItemText primary="Contacts" secondary="hello" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{ bgcolor: "primary.main" }}
                    alt="username"
                    src="/2.jpg"
                  ></Avatar>
                </ListItemIcon>
                <ListItemText primary="Contacts" secondary="hello" />
              </ListItemButton>
            </ListItem><ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar
                    sx={{ bgcolor: "primary.main" }}
                    alt="username"
                    src="/2.jpg"
                  ></Avatar>
                </ListItemIcon>
                <ListItemText primary="Contacts" secondary="hello" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default ContactList;
