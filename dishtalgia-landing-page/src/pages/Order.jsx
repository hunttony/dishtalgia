import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Alert } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Order = () => {
  const [paypalError, setPaypalError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  

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

      <Box sx={{ mt: 3 }}>
        <Typography variant="h3" color="rgb(0, 0, 0)">
          Checkout
        </Typography>

        

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
