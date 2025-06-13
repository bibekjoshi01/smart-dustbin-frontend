import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidthOpen = 200;
const drawerWidthClosed = 60;

type Props = {
  open: boolean;
};

const navItems = [
  { label: "Home", icon: <Home />, to: "/" },
  { label: "About", icon: <Info />, to: "/about" },
];

export default function Sidebar({ open }: Props) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        whiteSpace: "nowrap",
        [`& .MuiDrawer-paper`]: {
          width: open ? drawerWidthOpen : drawerWidthClosed,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
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
              sx={{ justifyContent: open ? "initial" : "center", px: 2 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
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
