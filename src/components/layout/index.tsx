import {
  AppBar,
  Toolbar,
  Box,
  CssBaseline,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Person } from "@mui/icons-material";

// Main Layout -> Esle Other Pages lai Wrap garcha
const drawerWidthOpen = 220;
const drawerWidthClosed = 60;

export default function Layout() {
  const [open, setOpen] = useState(true);
  const username = "BM UNity";
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: open ? `calc(100% - ${drawerWidthOpen}px)` : `calc(100% - ${drawerWidthClosed}px)`,
          backgroundColor: "white",
          transition: "width 0.3s",
          boxShadow: (theme) => theme.shadows[1],
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setOpen(!open)}
            sx={{
              mr: 2, '&:focus': {
                outline: 'none'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: 'auto' }}>
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto", pr: 2, }}>
              <IconButton sx={{
                p: 0, mr: 1, '&:focus': {
                  outline: 'none'
                }
              }}>
                <Person
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
              <Typography variant="body1" sx={{ color: "black" }}>
                {username}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SideBar Component */}
      <Sidebar open={open} />

      <Box
        sx={{
          px: 2,
          mt: 9,
          width: '100%'
        }}
      >
        {/* Other Routes */}
        <Outlet />
      </Box>
    </Box>
  );
}
