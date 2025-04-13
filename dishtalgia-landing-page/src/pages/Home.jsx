import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Grid, useTheme, useMediaQuery } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

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
      setScriptLoaded(false);
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="Home">
      {/* SEO Meta Tags & Structured Data */}
      <Helmet>
        <title>Dishtalgia - Best Banana Pudding in Houston, TX</title>
        <meta
          name="description"
          content="Discover Dishtalgia's irresistible banana pudding, crafted with love in Houston & Humble, TX. Order now for a nostalgic dessert experience!"
        />
        <meta
          name="keywords"
          content="banana pudding, desserts, Houston, Humble, Texas, Dishtalgia, nostalgic treats, creamy pudding"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dishtalgia.com/" />
        <meta property="og:title" content="Dishtalgia - Irresistible Banana Pudding in Houston" />
        <meta
          property="og:description"
          content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX."
        />
        <meta property="og:image" content="https://dishtalgia.com/dbfbp.png" />
        <meta property="og:url" content="https://dishtalgia.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Bakery",
            name: "Dishtalgia",
            description:
              "Dishtalgia offers the best banana pudding in Houston, TX, with classic and Bananas Foster varieties.",
            url: "https://dishtalgia.com/",
            logo: "https://dishtalgia.com/dbfbp.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "5131 Atascocita Road",
              addressLocality: "Humble",
              addressRegion: "TX",
              postalCode: "77346",
              addressCountry: "US",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              url: "https://dishtalgia.com/",
            },
          })}
        </script>
      </Helmet>

      <Container
        sx={{
          py: { xs: 4, md: 8 },
          background: "linear-gradient(135deg, #FFF3E0 0%, #FFE082 100%)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: "center", mb: 6 }}
        >
          <motion.div style={{ opacity, scale }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                color: "#3E2723",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                mb: 2,
              }}
            >
              Welcome to Dishtalgia
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "#FF6F00",
                fontWeight: 600,
                mb: 3,
              }}
            >
              Houston’s Finest Banana Pudding
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "#3E2723",
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Sample our delectable puddings at{" "}
              <a
                href="https://twistedcreole.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#FF6F00", textDecoration: "none", fontWeight: 600 }}
              >
                Twisted Creole Food Truck
              </a>{" "}
              | Porky's Backyard, 5131 Atascocita Road, Humble, TX 77346
            </Typography>
          </motion.div>
        </motion.div>

        {/* Product Showcase */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              color: "#3E2723",
              textAlign: "center",
              mb: 4,
            }}
          >
            Our Signature Puddings
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                to: "/product/original-banana-pudding",
                img: "/DOBP.png",
                alt: "Best Banana Pudding in Houston",
                title: "Original Banana Pudding",
              },
              {
                to: "/product/bananas-foster-pudding",
                img: "/DBFBP.png",
                alt: "Best Bananas Foster Pudding in Houston",
                title: "Bananas Foster Pudding",
              },
            ].map((product, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 15,
                    overflow: "hidden",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Link to={product.to} style={{ textDecoration: "none", color: "inherit" }}>
                    <img
                      src={product.img}
                      alt={product.alt}
                      loading="lazy"
                      style={{
                        width: "100%",
                        maxHeight: isMobile ? "200px" : "300px",
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.5rem" },
                        color: "#3E2723",
                        fontWeight: 600,
                        mt: 2,
                      }}
                    >
                      {product.title}
                    </Typography>
                  </Link>
                  <Button
                    component={Link}
                    to={product.to}
                    variant="contained"
                    sx={{
                      mt: 2,
                      px: 4,
                      py: 1,
                      background: "linear-gradient(45deg, #FF6F00, #FFA726)",
                      color: "#FFF",
                      borderRadius: 25,
                      fontWeight: 600,
                      "&:hover": {
                        background: "linear-gradient(45deg, #FFA726, #FF6F00)",
                      },
                    }}
                  >
                    Explore Now
                  </Button>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Subscription Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ textAlign: "center", mt: 8 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 700,
              color: "#3E2723",
              mb: 3,
            }}
          >
            Stay Sweet with Our Updates
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "#3E2723",
              maxWidth: "600px",
              mx: "auto",
              mb: 3,
            }}
          >
            Subscribe to get the latest on our delicious puddings and exclusive offers!
          </Typography>
          {scriptLoaded ? (
            <div className="ml-embedded" data-form="CEF1JJ"></div>
          ) : (
            <Typography sx={{ color: "#FF6F00" }}>Loading subscription form...</Typography>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;