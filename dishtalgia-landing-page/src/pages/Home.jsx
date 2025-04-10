import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Updated to match your install intent
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track script load status

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ml) {
        window.ml("account", "1404622"); // Ensure this is your correct MailerLite account ID
        setScriptLoaded(true); // Mark script as loaded
      }
    };

    script.onerror = () => {
      console.error("Failed to load MailerLite script");
      setScriptLoaded(false); // Handle script load failure
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="Home">
      {/* SEO Optimization */}
      <Helmet>
        <title>Dishtalgia - The Best Banana Pudding in Houston</title>
        <meta
          name="description"
          content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX."
        />
        <meta name="keywords" content="banana pudding, pudding, desserts, sweet, delicious, original, bananas foster, sauce, creamy, bananas, houston, heights, humble, dishtalgia, nostalgic, texas, " />

        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dishtalgia.com/" />
        <meta property="og:title" content="Dishtalgia - Warning: May cause extreme pudding cravings." />
        <meta
          property="og:description"
          content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX."
        />
        <meta property="og:image" content="https://dishtalgia.com/dbfbp.png" />
        <meta property="og:url" content="https://dishtalgia.com/" />
      </Helmet>

      {/* Main Content */}
      <Container sx={{ paddingY: 4 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: 2,
              fontFamily: "Tahoma",
              textShadow: "rgb(255, 55, 0) 1px 1px 10px",
              color: "rgb(55,55,55)",
            }}
          >
            Welcome to Dishtalgia
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              color: "orange",
              fontWeight: "bold",
              textShadow: "rgb(0, 0, 0) 0.5px 1px 3px",
            }}
          >
            Home of the Best Banana Pudding in Houston!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              color: "black",
              textShadow: "rgb(0, 0, 0) 0.5px 1px 3px",
              mt: 2,
            }}
          >
            Try a sample of our delicious banana pudding! Available at:{" "}
            <a href="https://twistedcreole.com" target="_blank" rel="noopener noreferrer">
              Twisted Creole Food Truck
            </a>{" "}
            | Located @ Porky's Backyard, 5131 Atascocita Road, Humble, TX 77346
          </Typography>
        </motion.div>

        {/* Product Showcase */}
        <Box
          display="flex"
          justifyContent="center"
          gap={3}
          marginTop={4}
          sx={{ flexWrap: "wrap" }}
        >
          {/* Original Banana Pudding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Paper
              elevation={4}
              sx={{
                padding: 2,
                textAlign: "center",
                maxWidth: 600,
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              }}
            >
              <Link
                to="/product/original-banana-pudding"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src="/DOBP.png"
                  alt="Best Banana Pudding in Houston"
                  maxWidth="300"
                  maxHeight="200"
                  loading="lazy"
                  style={{ borderRadius: 10 }}
                />
                <Typography variant="h3" sx={{ fontSize: "1.25rem", mt: 1 }}>
                  Original Banana Pudding
                </Typography>
              </Link>
            </Paper>
          </motion.div>

          {/* Bananas Foster Banana Pudding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Paper
              elevation={4}
              sx={{
                padding: 2,
                textAlign: "center",
                maxWidth: 600,
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              }}
            >
              <Link
                to="/product/bananas-foster-pudding"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src="/DBFBP.png"
                  alt="Best Bananas Foster Pudding in Houston"
                  maxWidth="300"
                  maxHeight="200"
                  loading="lazy"
                  style={{ borderRadius: 10 }}
                />
                <Typography variant="h3" sx={{ fontSize: "1.25rem", mt: 1 }}>
                  Bananas Foster Pudding
                </Typography>
              </Link>
            </Paper>
          </motion.div>
        </Box>

        {/* Fun Facts Section */}
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            marginTop: 5,
            backgroundColor: "#f8f8f8",
            marginBottom: 5,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
              marginBottom: 2,
            }}
          >
            🍌 Fun Facts About Banana Pudding! 🍮
          </Typography>
          <Box
            component="ul"
            sx={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.8", pl: 2 }}
          >
            <Typography component="li">
              Banana pudding has been a <strong>Southern dessert favorite</strong> since the late 19th century.
            </Typography>
            <Typography component="li">
              The first known banana pudding recipe was published in <strong>1878</strong> in "Housekeeping in Old Virginia".
            </Typography>
            <Typography component="li">
              Traditional banana pudding is made with <strong>vanilla wafers, bananas, and custard</strong>—but we made ours even better! 😉
            </Typography>
            <Typography component="li">
              There's an <strong>Annual National Banana Pudding Festival</strong> held in Tennessee every October! 🎉
            </Typography>
          </Box>
        </Paper>

        

        {/* Subscription Section (MailerLite Embed) */}
        <Box textAlign="center" marginTop={4}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <Typography
              variant="h3"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "rgb(55,55,55)",
              }}
            >
              Subscribe for Updates
            </Typography>
            <div className="ml-embedded" data-form="CEF1JJ"></div>
          </motion.div>
        </Box>
      </Container>
    </div>
  );
};

export default Home;