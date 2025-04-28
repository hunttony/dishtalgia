import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ThankYou = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resendStatus, setResendStatus] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load order details. Please contact support.");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleResendConfirmation = async () => {
    setResendStatus("Sending...");
    try {
      // Placeholder for email resend API (to be implemented)
      await axios.post(`/api/orders/${orderId}/resend-confirmation`);
      setResendStatus("Confirmation email resent!");
      setTimeout(() => setResendStatus(null), 3000);
    } catch (err) {
      setResendStatus("Failed to resend email. Please try again.");
      setTimeout(() => setResendStatus(null), 3000);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #fff7ed, #fff)",
        }}
      >
        <CircularProgress sx={{ color: "#ff9800" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #fff7ed, #fff)",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#555", fontFamily: "'Roboto', sans-serif" }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  const {
    deliveryInfo = { name: "Valued Customer" },
    cart = [],
    total = 0,
    deliveryFee = 0,
  } = order || {};

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #fff7ed, #fff)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>Thank You - Dishtalgia</title>
        <meta
          name="description"
          content="Thank you for your order at Dishtalgia! Enjoy the best banana pudding in Houston & Humble, TX."
        />
        <meta name="robots" content="noindex, follow" />
        <link
          rel="canonical"
          href={`https://dishtalgia.com/thank-you/${orderId}`}
        />
        <style>
          {`
            .thank-you-card {
              background: #ffffff;
              border-radius: 12px;
              border: 1px solid rgba(255, 152, 0, 0.2);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .thank-you-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 8px 24px rgba(255, 111, 97, 0.3);
            }
            .modern-button {
              background: linear-gradient(45deg, #ff6f61, #ffb88c);
              border: none;
              border-radius: 8px;
              padding: 10px 20px;
              color: white;
              font-weight: 600;
              text-transform: uppercase;
              box-shadow: 0 2px 8px rgba(255, 111, 97, 0.4);
              transition: all 0.3s ease;
            }
            .modern-button:hover {
              box-shadow: 0 4px 16px rgba(255, 111, 97, 0.6);
              transform: scale(1.05);
            }
          `}
        </style>
      </Helmet>

      <Header />

      <Container sx={{ py: { xs: 4, sm: 6 }, flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              mb: 2,
              fontFamily: "'Tahoma', sans-serif",
              color: "rgb(55,55,55)",
              textShadow: "1px 1px 10px rgba(255, 55, 0, 0.8)",
            }}
          >
            Thank You, {deliveryInfo.name}!
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: "#ff9800",
              fontWeight: "bold",
              textShadow: "0.5px 1px 3px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Roboto', sans-serif",
              mb: 2,
            }}
          >
            Your Order is Confirmed!
          </Typography>
          <Chip
            label="Order Status: Confirmed"
            sx={{
              backgroundColor: "#ff9800",
              color: "#fff",
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              mb: 4,
            }}
          />
        </motion.div>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="thank-you-card"
            >
              <Box sx={{ p: { xs: 3, sm: 4 }, textAlign: "center" }}>
                <img
                  src="/DOBP.png"
                  alt="Banana Pudding"
                  style={{
                    maxWidth: "150px",
                    borderRadius: "8px",
                    margin: "0 auto",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    color: "#333",
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 600,
                    mt: 3,
                  }}
                >
                  Order Details
                </Typography>
                <Box sx={{ mt: 2, textAlign: "left" }}>
                  {cart.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                        borderBottom:
                          index < cart.length - 1
                            ? "1px solid rgba(255, 152, 0, 0.2)"
                            : "none",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#555",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {item.name} ({item.size}, x{item.quantity})
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#555",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        ${(item.unit_amount.value * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid rgba(255, 152, 0, 0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "#333",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      Subtotal
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "#333",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      ${(total - deliveryFee).toFixed(2)}
                    </Typography>
                  </Box>
                  {deliveryFee > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          color: "#333",
                          fontWeight: 600,
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        Delivery Fee
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          color: "#333",
                          fontWeight: 600,
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        ${deliveryFee.toFixed(2)}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1,
                      pt: 2,
                      borderTop: "1px solid rgba(255, 152, 0, 0.2)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "#333",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "#333",
                        fontWeight: 600,
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                  {deliveryInfo && deliveryInfo.address_line_1 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          color: "#333",
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        Delivery Information
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#555",
                          fontFamily: "'Roboto', sans-serif",
                          mt: 1,
                        }}
                      >
                        <strong>Name:</strong> {deliveryInfo.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#555",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        <strong>Address:</strong> {deliveryInfo.address_line_1}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          color: "#555",
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        <strong>Phone:</strong> {deliveryInfo.phone}
                      </Typography>
                      {deliveryInfo.email && (
                        <Typography
                          sx={{
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            color: "#555",
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          <strong>Email:</strong> {deliveryInfo.email}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    color: "#555",
                    fontFamily: "'Roboto', sans-serif",
                    mt: 3,
                  }}
                >
                  {deliveryInfo.address_line_1
                    ? "Your order will be delivered to the provided address. Check your email for confirmation and delivery details."
                    : "Your order will be ready for pickup at Porky's Backyard, 5131 Atascocita Road, Humble, TX 77346. Check your email for confirmation and pickup details."}
                </Typography>
                <Button
                  className="modern-button"
                  onClick={handleResendConfirmation}
                  sx={{ mt: 2, mr: 2 }}
                  disabled={resendStatus === "Sending..."}
                >
                  Resend Confirmation Email
                </Button>
                {resendStatus && (
                  <Typography
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      color: resendStatus.includes("Failed") ? "#ff6f61" : "#ff9800",
                      mt: 1,
                    }}
                  >
                    {resendStatus}
                  </Typography>
                )}
                <Button
                  component={Link}
                  to="/"
                  className="modern-button"
                  sx={{ mt: 2 }}
                >
                  Back to Home
                </Button>
                <Typography
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    color: "#555",
                    mt: 2,
                    fontFamily: "'Roboto', sans-serif",
                  }}
                  
                >
                  Need help?{" "}
                  <a
                    href="mailto:support@dishtalgia.com"
                    style={{ color: "#ff6f61", textDecoration: "none" }}
                  >
                    Contact Support
                  </a>
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
};

export default ThankYou;