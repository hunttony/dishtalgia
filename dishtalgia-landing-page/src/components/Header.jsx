import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Animation variants for header elements
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <AppBar
      position="static"
      sx={{background: "linear-gradient(90deg, rgba(62, 39, 35, 0.7) 0%, rgba(93, 64, 55, 0.7) 100%)",xShadow: "0 4px 12px rgba(0,0,0,0.7)",
        width: "100vw",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          py: isMobile ? 1 : 2,
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Logo linking to Home */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="../dishtalgia_label1.png"
              alt="Dishtalgia Logo"
              style={{
                height: isMobile ? 40 : 60,
                borderRadius: "15px",
                transition: "transform 0.3s ease",
              }}
            />
          </Link>
        </motion.div>

        {/* Phone Number */}
        <motion.div variants={textVariants} initial="hidden" animate="visible">
          <Typography
            variant="h6"
            sx={{
              color: "#FF6F00",
              fontWeight: 600,
              fontSize: isMobile ? "0.9rem" : "1.2rem",
              fontFamily: "'Poppins', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            📞 832-617-3766
          </Typography>
        </motion.div>

        {/* Order Now Button linking to Order page */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            component={Link}
            to="/Order"
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #FF6F00, #FFA726)",
              color: "#FFF",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: 25,
              px: isMobile ? 3 : 4,
              py: isMobile ? 1 : 1.5,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #FFA726, #FF6F00)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
              },
            }}
          >
            Order Now
          </Button>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;