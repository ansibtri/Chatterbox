import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";

import { Email } from "@mui/icons-material";
import { CustomLink } from "../../shared/CustomLink";
import { JSX } from "react";

// Define the Page interface
interface Page {
  id: number;
  name: string;
  path: string;
}

export default function Navbar(): JSX.Element {
  const pages: Page[] = [
    { id: 1, name: "Products", path: "/products" },
    { id: 2, name: "Solutions", path: "/solutions" },
    { id: 3, name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "rgba(17, 16, 16, 0)",
          borderRadius: "50px",
          boxShadow: "4px 4px 30px rgba(139, 116, 116, 0.19)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(194, 177, 177, 0.3)",
          margin: "16px",
          width: "calc(100% - 32px)",
        }}
      >
        <Toolbar>
          <CustomLink to="/">
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              color:"white"
            }}
          >
            Chatterbox
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="website icon"
            sx={{ mr: 2, color:"white" }}
            >
            <Email />
          </IconButton>
            </CustomLink>
          <Box sx={{flexGrow: 1, display:'flex', justifyContent:'center'}}>
          <List sx={{ display: "flex", }}>
            {Array.from(pages).map((page) => (
              <ListItem>
                <ListItemText primary={<CustomLink sx={{color:"white","&:hover":{backgroundColor: "#1A1A1D"}}} to={page.path}>{page.name}</CustomLink>} />
              </ListItem>
            ))}
          </List>
          </Box>
          <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center", width: "200px"}}>
          <CustomLink to="/login" variant="outlined" sx={{borderColor: "white", color:"white", paddingRight: "10px"}}>Login</CustomLink>
          <CustomLink to="/signup" variant="outlined" sx={{borderColor: "white", color:"white", paddingRight: "10px"}}>Signup</CustomLink>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
