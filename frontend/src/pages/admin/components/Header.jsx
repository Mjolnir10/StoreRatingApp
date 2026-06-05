import React from "react";
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    // TODO: integrate with your auth logout flow
    console.log("logout");
    // Example: localStorage.removeItem('token');
    // window.location.href = '/login';
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          StoreRating Admin
        </Typography>
        <IconButton onClick={handleMenu} size="large" edge="end" color="inherit">
          <Avatar alt="Admin" src="/placeholder-avatar.png" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
