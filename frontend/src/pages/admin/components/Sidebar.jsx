import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Store, People, Settings } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;
const menuItems = [
  { label: "Dashboard", icon: <Dashboard />, to: "/admin/dashboard" },
  { label: "Stores", icon: <Store />, to: "/admin/stores" },
  { label: "Users", icon: <People />, to: "/admin/users" },
  { label: "Settings", icon: <Settings />, to: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <List sx={{ mt: 8 }}>
        {menuItems.map((item) => (
          <ListItemButton
            component={NavLink}
            to={item.to}
            key={item.label}
            activeClassName="active"
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
