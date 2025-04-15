import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Order = () => {
  const [paypalError, setPaypalError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const scriptId = "paypal-sdk";
    const containerId = "paypal-container-92ZQ66MLVTKCS";

    // Avoid re-inserting the script
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAXnxrqagXwz8f7DpSLMrBcd_4XIHQYqOvT4ZWU_4ST2S8_hGI59HBwydZX0jr4pcdHOK_EzsN0axlF7Q&components=hosted-buttons&enable-funding=venmo&currency=USD";
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          try {
            window.paypal.HostedButtons({
              hostedButtonId: "92ZQ66MLVTKCS",
            }).render(`#${containerId}`);
          } catch (err) {
            setPaypalError("Failed to render PayPal buttons.");
            console.error("PayPal render error:", err);
          }
        }
      };
      script.onerror = () => {
        setPaypalError("Failed to load PayPal SDK.");
      };
      document.body.appendChild(script);
    } else {
      // Script already exists — render if PayPal is ready
      if (window.paypal) {
        try {
          const container = document.getElementById(containerId);
          if (container && container.childNodes.length === 0) {
            window.paypal.HostedButtons({
              hostedButtonId: "92ZQ66MLVTKCS",
            }).render(`#${containerId}`);
          }
        } catch (err) {
          setPaypalError("Failed to render PayPal buttons.");
          console.error("PayPal render error:", err);
        }
      }
    }
  }, []);

  return (
    <Container
      sx={{
        py: 4,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        maxWidth: "600px",
      }}
    >
      <Helmet>
        <title>Order Banana Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Order the best banana pudding online from Dishtalgia and enjoy our delicious treats!"
        />
      </Helmet>

      <Box sx={{ mt: 3, justifySelf:"center", width:"100%" }}>
        <Typography variant="h3" color="rgb(0, 0, 0)">
          Checkout
        </Typography>

        {paypalError && (
          <Typography color="error" mt={2}>
            {paypalError}
          </Typography>
        )}

        <div id="paypal-container-92ZQ66MLVTKCS"></div>
      </Box>

      <Box textAlign="center" mt={4}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          sx={{ px: 4, py: 1 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default Order;
