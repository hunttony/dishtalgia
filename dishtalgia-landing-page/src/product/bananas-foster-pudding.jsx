import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet-async"; // Updated to match your install intent
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Added for navigation buttons

const BananasFosterPudding = () => {
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
        <title>Bananas Foster Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Experience the rich, caramelized flavor of our Bananas Foster Pudding, a delightful twist on the classic dessert."
        />
        <meta name="keywords" content="banana pudding, pudding, desserts, sweet, delicious, original, bananas foster, sauce, creamy, bananas, houston, treats" />

        <link rel="canonical" href="https://dishtalgia.com/product/bananas-foster-pudding" />
        <meta property="og:title" content="Bananas Foster Pudding - Dishtalgia" />
        <meta
          property="og:description"
          content="Experience the rich, caramelized flavor of our Bananas Foster Pudding, a delightful twist on the classic dessert."
        />
        <meta property="og:image" content="https://dishtalgia.com/dbfbp.png" />
        <meta property="og:url" content="https://dishtalgia.com/product/bananas-foster-pudding" />
      </Helmet>

      <Typography variant="h1" sx={{ fontSize: "2.5rem", color: "rgb(55,55,55)" }}>
        Bananas Foster Pudding
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        A gourmet take on banana pudding with caramelized bananas and a hint of rum. Order now!
      </Typography>

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
        Bananas Foster Pudding
      </Typography>

      {/* Product Images */}
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <img
          src="/DBFBP.png"
          alt="Bananas Foster Pudding"
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
            Indulge in layers of velvety banana pudding infused with the rich, caramelized magic of Bananas Foster.
          </Typography>
        </motion.div>

        <img
          src="/DBFBP1.png"
          alt="Banana Pudding Close-up"
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
            Buttery, spiced rum sauce drizzled and sweet certified organic banana slices.
          </Typography>
        </motion.div>

        <img
          src="/DBFBP3.png"
          alt="Creamy Banana Pudding"
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
            And our original ultra creamy pudding — it’s dessert perfection in every bite!
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
        🍌 Fresh Organic Bananas, 🥛 Sweet Cream, 🍪 Nilla Wafers, 🍮 Real Vanilla, Our Original Pudding, 🍬 Sugar, 🧈 Butter, 🍹 Rum, and Our Butter-Nut Crumble
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
      <Box
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
        <Typography component="li">Small (4oz) - $7</Typography>
        <Typography component="li">Regular (8oz) - $12</Typography>
        <Typography component="li">Medium (16oz) - $21</Typography>
        <Typography component="li">Large (32oz) - $38</Typography>
        <Typography component="li">Party (96oz) - call</Typography>
      </Box>

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
        ⭐⭐⭐⭐⭐ "The best banana pudding I’ve ever had! So creamy and delicious!" - Sarah T.
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
        ⭐⭐⭐⭐⭐ "Tastes just like grandma used to make! Will definitely order again." - Mike D.
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
          to="/product/original-banana-pudding"
          variant="outlined"
          color="primary"
          sx={{ paddingX: 4, paddingY: 1 }}
        >
          Original Banana Pudding
        </Button>
      </Box>

      {/* PayPal Buy Button */}
      <Box textAlign="center" marginTop={4}>
        <Typography>Online ordering coming soon... Stay Tuned --</Typography>
        <Button
          href="https://www.paypal.com/your-buy-now-link" // Replace with actual PayPal link
          variant="contained"
          color="warning"
          sx={{ paddingX: 4, paddingY: 1 }}
        >
          Order Now
        </Button>
      </Box>
    </Container>
  );
};

export default BananasFosterPudding;