import React from "react";
import { Container, Typography, Box, Button, Grid, useTheme, useMediaQuery } from "@mui/material";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const BananasFosterPudding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

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
    <Container
      sx={{
        py: { xs: 4, md: 8 },
        background: "linear-gradient(135deg, #FFF8E1 0%, #FFCA28 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* SEO Meta Tags & Structured Data */}
      <Helmet>
        <title>Bananas Foster Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Savor Dishtalgia's Bananas Foster Pudding, a luxurious dessert with caramelized bananas, rum-infused sauce, and creamy vanilla pudding. Order now in Houston, TX!"
        />
        <meta
          name="keywords"
          content="bananas foster pudding, desserts, caramelized bananas, rum, creamy, Houston, Texas, Dishtalgia"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dishtalgia.com/product/bananas-foster-pudding" />
        <meta property="og:title" content="Bananas Foster Pudding - Dishtalgia" />
        <meta
          property="og:description"
          content="Indulge in the rich, caramelized flavor of our Bananas Foster Pudding, a gourmet twist on a classic dessert."
        />
        <meta property="og:image" content="https://dishtalgia.com/dbfbp.png" />
        <meta property="og:url" content="https://dishtalgia.com/product/bananas-foster-pudding" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "Bananas Foster Pudding",
            image: "https://dishtalgia.com/dbfbp.png",
            description:
              "A gourmet dessert featuring caramelized bananas, rum-infused sauce, creamy vanilla pudding, and butter-nut crumble.",
            brand: { "@type": "Brand", name: "Dishtalgia" },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "7.00",
              availability: "https://schema.org/InStock",
              url: "https://dishtalgia.com/product/bananas-foster-pudding",
            },
          })}
        </script>
      </Helmet>

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
            Bananas Foster Pudding
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: { xs: "1.2rem", md: "1.5rem" },
              color: "#FF6F00",
              fontWeight: 500,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Caramelized bananas, rum-infused sauce, and silky pudding—a decadent twist on a classic!
          </Typography>
        </motion.div>
      </motion.div>

      {/* Location Info */}
      <motion.div variants={itemVariants} style={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, color: "#3E2723" }}
        >
          Taste it at{" "}
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

      {/* Product Images */}
      <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
        {[
          {
            src: "/DBFBP.png",
            alt: "Bananas Foster Pudding",
            text: "Velvety pudding with Bananas Foster magic.",
          },
          {
            src: "/DBFBP1.png",
            alt: "Banana Pudding Close-up",
            text: "Spiced rum sauce over organic bananas.",
          },
          {
            src: "/DBFBP3.png",
            alt: "Creamy Banana Pudding",
            text: "Creamy perfection in every bite!",
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                textAlign: "center",
                borderRadius: 15,
                overflow: "hidden",
                background: "rgba(255,255,255,0.9)",
                p: 2,
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  maxHeight: isMobile ? "200px" : "300px",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontSize: { xs: "1rem", md: "1.1rem" }, // Fixed syntax error
                  color: "#3E2723",
                  fontWeight: 500,
                }}
              >
                {item.text}
              </Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Ingredients */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 700,
            color: "#3E2723",
            textAlign: "center",
            my: 4,
          }}
        >
          Ingredients
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1.1rem", md: "1.2rem" },
            color: "#3E2723",
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          🍌 Fresh Organic Bananas, 🥛 Sweet Cream, 🍪 Nilla Wafers, 🍮 Real Vanilla, 🍬 Sugar, 🧈 Butter, 🍹 Rum, 🌰 Butter-Nut Crumble
        </Typography>
      </motion.div>

      {/* Size Choices */}
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 700,
            color: "#3E2723",
            textAlign: "center",
            my: 4,
          }}
        >
          Choose Your Size
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
           
            { size: "Regular (8oz)", price: "$10" },           
            { size: "Large (32oz)", price: "$38" },
            { size: "Party (96oz)", price: "$100" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                whileHover={{ y: -10, boxShadow: "0 8px 16px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  background: "rgba(255,255,255,0.95)",
                  p: 3,
                  borderRadius: 15,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontSize: "1.2rem", color: "#3E2723", fontWeight: 600 }}>
                  {item.size}
                </Typography>
                <Typography sx={{ fontSize: "1.4rem", color: "#FF6F00", fontWeight: 700 }}>
                  {item.price}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Order Now Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ textAlign: "center", mb: 6 }}
      >
        <Typography sx={{ fontSize: "1.2rem", color: "#3E2723", mb: 2 }}>
        Online ordering available NOW!
        </Typography>
        <Button
          href="/Order" // Replace with actual PayPal link
          variant="contained"
          sx={{
            px: 6,
            py: 2,
            background: "linear-gradient(45deg, #FF6F00, #FFA726)",
            color: "#FFF",
            borderRadius: 30,
            fontWeight: 700,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #FFA726, #FF6F00)",
              transform: "scale(1.05)",
            },
          }}
        >
          Order Now
        </Button>
      </motion.div>

      {/* Navigation Buttons */}
      <Box textAlign="center" sx={{ my: 6 }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            mx: 1,
            px: 4,
            py: 1.5,
            color: "#3E2723",
            borderColor: "#3E2723",
            borderRadius: 25,
            fontWeight: 600,
            "&:hover": { background: "#3E2723", color: "#FFF" },
          }}
        >
          Back to Home
        </Button>
        <Button
          component={Link}
          to="/product/original-banana-pudding"
          variant="outlined"
          sx={{
            mx: 1,
            px: 4,
            py: 1.5,
            color: "#3E2723",
            borderColor: "#3E2723",
            borderRadius: 25,
            fontWeight: 600,
            "&:hover": { background: "#3E2723", color: "#FFF" },
          }}
        >
          Original Banana Pudding
        </Button>
      </Box>

      
    </Container>
  );
};

export default BananasFosterPudding;