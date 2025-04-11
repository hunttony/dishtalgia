import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet-async"; // Assumes installed with --legacy-peer-deps
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Added for navigation buttons

const OriginalBananaPudding = () => {
  return (
    <Container
      sx={{
        paddingY: 4,
        borderRadius: "50%",
        backgroundColor: "rgba(255, 128, 0, 0.03)",
        fontFamily: "Tahoma",
        textShadow: "rgb(255, 140, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",
      }}
    >
      <Helmet>
        <title>Original Banana Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Enjoy our creamy, homemade Original Banana Pudding, made with fresh bananas and vanilla wafers. Order yours now!"
        />
        <meta name="keywords" content="banana pudding, pudding, desserts, sweet, delicious, original, sauce, creamy, bananas, houston, heights, treats" />
        <link rel="canonical" href="https://dishtalgia.com/product/original-banana-pudding" />
        <meta property="og:title" content="Original Banana Pudding - Dishtalgia" />
        <meta
          property="og:description"
          content="Enjoy our creamy, homemade Original Banana Pudding, made with fresh bananas and vanilla wafers."

        />
        <meta property="og:image" content="https://dishtalgia.com/dbfbp.png" />
        <meta property="og:url" content="https://dishtalgia.com/product/original-banana-pudding" />
      </Helmet>

      <Typography
        variant="body2"
        sx={{ fontSize: "14px", color: "black", textShadow: "rgb(0, 0, 0) 0.5px 1px 3px" }}
      >
        Try a sample of our delicious banana pudding! Available at:{" "}
        <a href="https://twistedcreole.com" target="_blank" rel="noopener noreferrer">
          Twisted Creole Food Truck
        </a>{" "}
        | Located @ Porky's Backyard 5131 Atascocita Road, Humble, TX 77346
      </Typography>

      <Typography
        variant="h2"
        sx={{ fontFamily: "Tahoma", fontWeight: "bold", textAlign: "center", marginBottom: 3, color: "red" }}
      >
        Original Banana Pudding
      </Typography>

      {/* Product Images */}
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <img
          src="/DOBP.png"
          alt="Best Original Banana Pudding in Houston"
          max-width="300"
          max-height="200"
          loading="lazy"
          style={{ borderRadius: 10 }}
        />
        <motion.div
          style={{ padding: "10px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="body1"
            sx={{
              maxWidth: "200px",
              padding: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.025)",
              fontFamily: "Tahoma",
              fontSize: "20px",
              textShadow: "rgb(255, 55, 0) 1px 1px 10px",
              color: "rgb(55,55,55)",
            }}
          >
            Layers of silky smooth vanilla pudding, real vanilla ripe certified organic bananas, and perfectly crisp cookies.
          </Typography>
        </motion.div>

        <img
          src="/DOBP4.png"
          alt="Best Banana Pudding in Houston Close-up"
          max-width="300"
          max-height="200"
          loading="lazy"
          style={{ borderRadius: 10 }}
        />
        <motion.div
          style={{ padding: "10px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="body1"
            sx={{
              maxWidth: "200px",
              padding: "20px",
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.025)",
              fontFamily: "Tahoma",
              fontSize: "20px",
              textShadow: "rgb(255, 55, 0) 1px 1px 10px",
              color: "rgb(55,55,55)",
            }}
          >
            Quality ingredients coming together in this timeless dessert. A spoonful of nostalgia, made with love in every bite!
          </Typography>
        </motion.div>
      </Box>

      {/* Ingredients */}
      <Typography
        variant="h3"
        sx={{
          marginTop: 3,
          fontWeight: "bold",
          fontFamily: "Tahoma",
          fontSize: "20px",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(0, 0, 0)",
        }}
      >
        Ingredients:
      </Typography>
      <Typography
        variant="body1"
        sx={{
          padding: "20px",
          borderRadius: "10%",
          fontFamily: "Tahoma",
          fontSize: "18px",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        🍌 Fresh Organic Bananas, 🥛 Sweet Cream, 🍪 Nilla Wafers, 🍮 Real Vanilla
      </Typography>

      {/* Size Choices */}
      <Typography
        variant="h3"
        sx={{
          marginTop: 3,
          fontWeight: "bold",
          padding: "5px",
          borderRadius: "10px",
          backgroundColor: "rgba(0,0,0,0.025)",
          fontFamily: "Tahoma",
          fontSize: "20px",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(0, 0, 0)",
        }}
      >
        Choose Your Size:
      </Typography>
      {/*<Box
        component="ul"
        sx={{
          paddingLeft: 2,
          padding: "5px",
          borderRadius: "10%",
          fontFamily: "Tahoma",
          textAlign: "center",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        <Typography component="li">Regular (8oz) - $8</Typography>        
        <Typography component="li">Large (32oz) - $28</Typography>
        <Typography component="li">Party (96oz) - $80</Typography>
      </Box>*/}

      <Typography
        variant="body1"
        sx={{
          padding: "20px",
          justifySelf:"center",
          width: "300px",
          borderRadius: "10%",
          fontFamily: "Tahoma",
          fontSize: "18px",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        <div id="paypal-container-JWU8P2CVR9LVS"></div>
      </Typography>

      

      {/* Reviews */}
      <Typography
        variant="h3"
        sx={{
          marginTop: 3,
          fontWeight: "bold",
          padding: "5px",
          borderRadius: "10%",
          backgroundColor: "rgba(0,0,0,0.025)",
          fontFamily: "Tahoma",
          textAlign: "center",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        Customer Reviews:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginTop: 3,
          fontWeight: "bold",
          padding: "5px",
          borderRadius: "50%",
          fontFamily: "Tahoma",
          textAlign: "center",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        ⭐⭐⭐⭐⭐ "The Best Banana Pudding Ever!"<br />
        I’ve had my fair share of banana pudding, but this one is on another level! The custard is so smooth and creamy, the bananas are perfectly ripe, and the cookies are like cake. Every bite is pure heaven—this is my new go-to dessert! - Anthony C.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          marginTop: 3,
          fontWeight: "bold",
          padding: "5px",
          borderRadius: "50%",
          fontFamily: "Tahoma",
          textAlign: "center",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(55,55,55)",
        }}
      >
        ⭐⭐⭐⭐⭐ "A Taste of Homemade Perfection"<br />
        This banana pudding is everything you want in a classic dessert—rich, velvety, and full of flavor! It tastes just like the one my grandmother used to make, but somehow even better. The layers blend together beautifully, and I can’t stop coming back for more. Absolutely delicious! - Meagan K.
      </Typography>

      {/* Navigation Buttons */}
      <Box textAlign="center" marginTop={4}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          sx={{ paddingX: 4, paddingY: 1, marginRight: 2 }}
        >
          Back to Home
        </Button>
        <Button
          component={Link}
          to="/product/bananas-foster-pudding"
          variant="outlined"
          color="primary"
          sx={{ paddingX: 4, paddingY: 1 }}
        >
          Bananas Foster Pudding
        </Button>
      </Box>

      {/* PayPal Buy Button */}
      
    </Container>
  );
};

export default OriginalBananaPudding;