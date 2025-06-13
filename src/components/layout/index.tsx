import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

// Main Layout -> Esle Other Pages lai Wrap garcha

export default function Layout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "primary",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Dustbin Name in NavBar */}
          <Typography variant="h6" noWrap>
            Eco Smart Dustbin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SideBar Component */}
      <Sidebar open={open} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />

        {/* Other Routes */}
        <Outlet />
      </Box>
    </Box>
  );
}
