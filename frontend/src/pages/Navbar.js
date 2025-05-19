// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Box, Stack } from "@mui/material";
// import GymLogo from "../assets/images/logo/3-removebg-preview (1).png";
// import "../stylesheets/Navbar.css";
// import ButtonComponent from "../components/ButtonComponent"; // import the reusable button

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleJoinNowClick = () => {
//     navigate("/Explore");
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#fff",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 10,
//         padding: "0.8rem 2rem",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Link to="/" className="nav-logo">
//         <img src={GymLogo} alt="Logo" className="logo" />
//       </Link>

//       <Stack direction="row" spacing={3} className="nav-links">
//         <Link to="/about" className="nav-link">ABOUT</Link>
//         <Link to="/projects" className="nav-link">PROJECTS</Link>
//         {/* <Link to="/membership" className="nav-link">MEMBERSHIP</Link> */}
//         <Link to="/feedbackform" className="nav-link">FEEDBACK</Link>
//         <Link to="/contact" className="nav-link">CONTACT</Link>
//       </Stack>

//       <Stack direction="row" alignItems="center" spacing={2}>
//         <ButtonComponent label="Explore" onClick={handleJoinNowClick} />
//       </Stack>
//     </Box>
//   );
// };

// export default Navbar;
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
  // { label: "MEMBERSHIP", path: "/membership" },
  { label: "CONTACT", path: "/contact" },
   { label: "FEEDBACK", path: "/feedbackform" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleJoinNowClick = () => {
    navigate("/Explore");
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
        <ButtonComponent label="Explore" onClick={handleJoinNowClick} />
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
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
