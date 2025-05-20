import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GymLogo from "../assets/images/logo/logo.png";
import "../stylesheets/Navbar.css";
import ButtonComponent from "../components/ButtonComponent";

const NAV_LINKS = [
  { label: "ABOUT", path: "/about" },
  { label: "PROJECTS", path: "/projects" },
  { label: "DASHBOARD", path: "/dashboard" },
  { label: "CONTACT", path: "/contact" },
   { label: "FEEDBACK", path: "/feedbackform" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleJoinNowClick = () => {
    navigate("/Admin");
    setDrawerOpen(false);
  };

  return (
    <Box className="navbar-root">
      <Link to="/" className="nav-logo">
        <img src={GymLogo} alt="Logo" className="logo" />
      </Link>

      {/* Desktop Links */}
      <Stack direction="row" spacing={3} className="nav-links">
        {NAV_LINKS.map(link => (
          <Link key={link.path} to={link.path} className="nav-link">
            {link.label}
          </Link>
        ))}
      </Stack>

      {/* Desktop Button */}
      <Stack direction="row" alignItems="center" spacing={2} className="nav-cta">
        <ButtonComponent label="Admin" onClick={handleJoinNowClick} />
      </Stack>

      {/* Hamburger Menu Icon for Mobile */}
      <IconButton
        className="menu-icon"
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={() => setDrawerOpen(true)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: 250, backgroundColor: "#fff" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 2 }}>
          <img src={GymLogo} alt="Logo" style={{ height: 40 }} />
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map(link => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton component={Link} to={link.path} onClick={() => setDrawerOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={handleJoinNowClick}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
