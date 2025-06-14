import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import { Home, Info, Logout } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/libs/hooks";
import { logoutSuccess } from "@/pages/authentication/redux/auth.slice";

const drawerWidthOpen = 220;
const drawerWidthClosed = 60;

type Props = {
  open: boolean;
};

const navItems = [
  { label: "Home", icon: <Home />, to: "/" },
  { label: "About", icon: <Info />, to: "/about" },
  { label: "Logout", icon: <Logout />, to: "" },

];

export default function Sidebar({ open }: Props) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutSuccess());
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        whiteSpace: "nowrap",
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          color: 'white',
          transition: "width 0.3s",
          backgroundColor: 'primary.main',
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '64px',
        ml: open ? -3 : 0,
        backgroundColor: 'primary.dark',
      }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            filter: "invert(1)",
            cursor: "pointer",
          }}
        />
        <Typography variant="body1" sx={{
          display: open ? 'block' : 'none', transition: "width 0.3s"
        }} noWrap>
          Eco Smart Dustbin
        </Typography>
      </Box>

      <Divider />
      <List sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {navItems.map((item) => (
          <Tooltip
            title={!open ? item.label : ""}
            placement="right"
            key={item.to}
          >
            <ListItemButton
              component={Link}
              to={item.to}
              selected={location.pathname === item.to}
              onClick={item.label === "Logout" ? handleLogout : undefined}
              sx={{
                flexGrow: 0,
                marginTop: item.label === "Logout" ? "auto" : undefined,
                justifyContent: open ? "initial" : "center",
                px: 2,
                '&:hover': { color: 'white' },
                '&.Mui-selected': { backgroundColor: '#196e55' },
                '&.Mui-selected:hover': { backgroundColor: '#196e55' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: 'white'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
