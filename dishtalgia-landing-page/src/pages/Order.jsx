import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Alert } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Order = () => {
  const [cart, setCart] = useState([]);
  const [paypalError, setPaypalError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  // Load PayPal SDK with hosted buttons support
  useEffect(() => {
    const existingScript = document.querySelector("#paypal-sdk");

    if (existingScript) {
      renderHostedButton();
    } else {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAXnxrqagXwz8f7DpSLMrBcd_4XIHQYqOvT4ZWU_4ST2S8_hGI59HBwydZX0jr4pcdHOK_EzsN0axlF7Q&components=hosted-buttons&enable-funding=venmo&currency=USD";
      script.crossOrigin = "anonymous";
      script.async = true;

      script.onload = () => {
        renderHostedButton();
      };

      script.onerror = () => {
        setPaypalError("Failed to load PayPal. Please refresh the page or try again later.");
      };

      document.body.appendChild(script);
    }
  }, []);

  const renderHostedButton = () => {
    if (window.paypal && window.paypal.HostedButtons) {
      try {
        window.paypal
          .HostedButtons({
            hostedButtonId: "92ZQ66MLVTKCS",
          })
          .render("#paypal-container-92ZQ66MLVTKCS");
      } catch (err) {
        console.error(err);
        setPaypalError("Failed to render PayPal hosted button.");
      }
    }
  };

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);
  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0);

  return (
    <Container sx={{ paddingY: 4, textAlign: "center", justifyItems: "center", backgroundColor:"rgba(0, 0, 0 ,.7)", maxWidth:"600px"}}>
      <Helmet>
        <title>Order Banana Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Order the best banana pudding online from Dishtalgia and enjoy our delicious treats!"
        />
      </Helmet>

      {/*<Typography variant="h2" sx={{ fontWeight: "bold", color: "rgb(55,55,55)", marginBottom: 2 }}>
        Order Banana Pudding
      </Typography>*/}

      

      {/* 🏦 Hosted PayPal Button */}
      <Box sx={{ marginTop: 3, width: "400px", justifySelf:"center"}}>
        <Typography variant="h3" color="rgb(55,55,55)">Checkout</Typography>

        {paypalError && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {paypalError}
          </Alert>
        )}

        {paymentStatus && (
          <Alert severity="success" sx={{ marginTop: 2 }}>
            {paymentStatus}
          </Alert>
        )} 

        {/* PayPal Hosted Button Container */}
        <div id="paypal-container-92ZQ66MLVTKCS" style={{ marginTop: "16px" }}></div>
      </Box>

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
      </Box>
    </Container>
  );
};

export default Order;
