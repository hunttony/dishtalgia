import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"; // Added for motion.div

const OriginalBananaPudding = () => {
  return (
    <Container sx={{ paddingY: 4,
      borderRadius: "50%",
              backgroundColor:"rgba(255, 128, 0, 0.03)",
              fontFamily:"Tahoma",              
              textShadow: "rgb(255, 140, 0) 1px 1px 10px",
              color: "rgb(55,55,55)",
     }}>
      <Helmet>
        <title>Original Banana Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Delicious homemade Bananas Foster Pudding made with fresh bananas, vanilla wafers, and rich cream, topped with a buttery rum sauce."
        />
      </Helmet>
      <Typography variant="h5" sx={{ fontSize:"14px",color: "black", textShadow: "rgb(0, 0, 0) .5px 1px 3px" }}>Try a sample of our delicious banana pudding!
      Available at: Twisted Creole Food Truck | Located @ Porky's Backyard 5131 Atascocita Road, Humble, TX 77346</Typography>

      <Typography
        variant="h3"
        sx={{ fontFamily:"Tahoma", fontWeight: "bold", textAlign: "center", marginBottom: 3, color:"red" }}
      >
        Original Banana Pudding
      </Typography>

      {/* Product Images */}
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        <img
          src="/DOBP.png"
          alt="Bananas Foster Pudding"
          style={{ width: "50%", borderRadius: 10 }}
        />
        <motion.div
          style={{  padding: "10px" }} // Added padding for better appearance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              maxWidth: "200px",
              padding: "20px",
              borderRadius: "50%",
              backgroundColor:"rgba(0,0,0,0.025)",
              fontFamily:"Tahoma",
              fontSize:"20px",
              textShadow: "rgb(255, 55, 0) 1px 1px 10px",
              color: "rgb(55,55,55)", // Added for readability on dark background
            }}
          >
            Layers of silky smooth vanilla pudding, real vanilla 
            ripe certified organic bananas, and perfectly crisp cookies.
          </Typography>
        </motion.div>
                
        <img
          src="/DOBP4.png"
          alt="Banana Pudding Close-up"
          style={{ width: "50%", borderRadius: 10 }}
        />
        <motion.div
          style={{  padding: "10px" }} // Added padding for better appearance
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              maxWidth: "200px",
              padding: "20px",
              borderRadius: "50%",
              backgroundColor:"rgba(0,0,0,0.025)",
              fontFamily:"Tahoma",
              fontSize:"20px",
              textShadow: "rgb(255, 55, 0) 1px 1px 10px",
              color: "rgb(55,55,55)", // Added for readability on dark background
            }}
          >
            Quality ingredients coming together in this timeless dessert. A 
            spoonful of nostalgia, made with love in every bite!

          </Typography>         
        </motion.div>
        
        
      </Box>

      {/* Ingredients */}
      <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold",
        fontFamily:"Tahoma",
        fontSize:"20px",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(0, 0, 0)",
      }}>
        Ingredients:
      </Typography>
      <Typography variant="body1" 
      sx={{
       
        padding: "20px",
        borderRadius: "10%",
       
        fontFamily:"Tahoma",
        fontSize:"18px",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",  // Added for readability on dark background
      }}>
        🍌 Fresh Organic Bananas, 🥛 Sweet Cream, 🍪 Nilla Wafers, 🍮 Real Vanilla,
        Our Original Pudding, 🍬 Sugar, 🧈 Butter, 🍹 Rum, and Our Butter-Nut Crumble
      </Typography>

      {/* Size Choices */}
      <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold",
          padding: "5px",
          borderRadius: "10px",
          backgroundColor:"rgba(0,0,0,0.025)",
          fontFamily:"Tahoma",
          fontSize:"20px",
          textShadow: "rgb(255, 55, 0) 1px 1px 10px",
          color: "rgb(0, 0, 0)",  // Added for readability on dark background
        
       }}>
        Choose Your Size:
      </Typography>
      <Box component="ul" sx={{ paddingLeft: 2,
        padding: "5px",
        borderRadius: "10%",
        
        fontFamily:"Tahoma",
        textAlign:"center",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",
       }}>
        <Typography component="li">Small (4oz) - $6</Typography>
        <Typography component="li">Regular (8oz) - $10</Typography>
        <Typography component="li">Medium (16oz) - $18</Typography>
        <Typography component="li">Large (32oz) - $30</Typography>
        <Typography component="li">Party (96oz) - call</Typography>
      </Box>

      {/* Reviews */}
      <Typography variant="h5" sx={{ marginTop: 3, fontWeight: "bold",
        padding: "5px",
        borderRadius: "10%",
        backgroundColor:"rgba(0,0,0,0.025)",
        fontFamily:"Tahoma",
        textAlign:"center",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",
       }}>
        Customer Reviews:
      </Typography>
      <Typography variant="body2" 
      sx={{ marginTop: 3, fontWeight: "bold",
        padding: "5px",
        borderRadius: "50%",
        fontFamily:"Tahoma",
        textAlign:"center",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",
       }}>
        ⭐⭐⭐⭐⭐ "The Best Banana Pudding Ever!"
        I’ve had my fair share of banana pudding, but this one is on 
        another level! The custard is so smooth and creamy, the bananas 
        are perfectly ripe, and the cookies are like cake. Every bite is pure heaven—this is my 
        new go-to dessert!" - Anthony C.
      </Typography>
      <Typography variant="body2" 
      sx={{ marginTop: 3, fontWeight: "bold",
        padding: "5px",
        borderRadius: "50%",
        fontFamily:"Tahoma",
        textAlign:"center",
        textShadow: "rgb(255, 55, 0) 1px 1px 10px",
        color: "rgb(55,55,55)",
       }}>
        ⭐⭐⭐⭐⭐ "A Taste of Homemade Perfection"
        This banana pudding is everything you want in a classic dessert—rich, 
        velvety, and full of flavor! It tastes just like the one my 
        grandmother used to make, but somehow even better. The layers 
        blend together beautifully, and I can’t stop coming back for more. 
        Absolutely delicious! - Meagan K.
      </Typography>

      {/* PayPal Buy Button */}
      
      <Box textAlign="center" marginTop={4}>
      Online ordering coming soon... Stay Tuned --
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

export default OriginalBananaPudding;