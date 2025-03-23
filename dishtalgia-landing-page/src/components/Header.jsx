import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 1)",
        boxShadow: "rgba(255, 255, 255, 0.75)",
        width:"100vw"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap", // Ensures responsiveness for mobile
        }}
      >
        {/* Logo linking to Home */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            src="../dishtalgia_label1.png"
            alt="Dishtalgia Logo"
            style={{ height: 50, borderRadius: "30px" }}
          />
        </Link>
        {/* Phone Number */}
        <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
          📞 832-617-3766
        </Typography>
        {/* Order Now Button */}
        online ordering coming soon!
        <Button variant="contained" color="warning">
          Order Now
        </Button>
      </Toolbar>

      
    </AppBar>
  );
};

export default Header;