import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.ml) {
        window.ml("account", "1404622");
        setScriptLoaded(true);
      }
    };

    script.onerror = () => {
      console.error("Failed to load MailerLite script");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="Home">
      <Helmet>
        <title>Dishtalgia - The Best Banana Pudding in Houston</title>
        <meta
          name="description"
          content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX."
        />
        <meta
          name="keywords"
          content="banana pudding, pudding, desserts, sweet, delicious, original, bananas foster, sauce, creamy, bananas, houston, heights, humble, dishtalgia, nostalgic, texas"
        />
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

      <Container sx={{ py: 4 }}>
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
              mb: 2,
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
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={3} mt={4}>
          {[
            {
              to: "/product/original-banana-pudding",
              img: "/DOBP.png",
              alt: "Original Banana Pudding",
              label: "Original Banana Pudding"
            },
            {
              to: "/product/bananas-foster-pudding",
              img: "/DBFBP.png",
              alt: "Bananas Foster Pudding",
              label: "Bananas Foster Pudding"
            }
          ].map(({ to, img, alt, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.5 }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  textAlign: "center",
                  maxWidth: 600,
                  backgroundColor: "rgba(255, 255, 255, 0.75)",
                }}
              >
                <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={img}
                    alt={alt}
                    style={{ maxWidth: 300, maxHeight: 200, borderRadius: 10 }}
                    loading="lazy"
                  />
                  <Typography variant="h3" sx={{ fontSize: "1.25rem", mt: 1 }}>
                    {label}
                  </Typography>
                </Link>
              </Paper>
            </motion.div>
          ))}
        </Box>

        {/* Fun Facts */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mt: 5,
            mb: 5,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
              mb: 2,
            }}
          >
            🍌 Fun Facts About Banana Pudding! 🍮
          </Typography>
          <Box component="ul" sx={{ fontSize: "1.2rem", color: "#555", lineHeight: 1.8, pl: 2 }}>
            {[
              "Banana pudding has been a Southern dessert favorite since the late 19th century.",
              'The first known banana pudding recipe was published in 1878 in "Housekeeping in Old Virginia".',
              "Traditional banana pudding is made with vanilla wafers, bananas, and custard—but we made ours even better! 😉",
              "There's an Annual National Banana Pudding Festival held in Tennessee every October! 🎉"
            ].map((fact, idx) => (
              <Typography key={idx} component="li">
                {fact}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* Subscription Section */}
        <Box textAlign="center" mt={4}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold", color: "rgb(55,55,55)" }}>
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
