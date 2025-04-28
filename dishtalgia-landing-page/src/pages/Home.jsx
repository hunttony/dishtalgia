import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../App.css";

const Home = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { addToCart } = useCart();
  const [selections, setSelections] = useState({
    "Original Banana Pudding": { size: "Regular", quantity: 1 },
    "Bananas Foster Pudding": { size: "Regular", quantity: 1 },
  });

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

  const products = [
    {
      id: "original",
      to: "/product/original-banana-pudding",
      img: "/DOBP.png",
      alt: "Original Banana Pudding",
      label: "Original Banana Pudding",
      price: { Regular: 8.0, Family: 28.99, Pan: 80.0 },
    },
    {
      id: "foster",
      to: "/product/bananas-foster-pudding",
      img: "/DBFBP.png",
      alt: "Bananas Foster Pudding",
      label: "Bananas Foster Pudding",
      price: { Regular: 10.0, Family: 35.0, Pan: 100.0 },
    },
  ];

  const handleAddToCart = (product) => {
    const { size, quantity } = selections[product.label];
    addToCart(
      { id: product.id, name: product.label, price: product.price[size] },
      size,
      quantity
    );
  };

  const handleSelectionChange = (label, field, value) => {
    setSelections((prev) => ({
      ...prev,
      [label]: { ...prev[label], [field]: value },
    }));
  };

  return (
    <div
      className="Home"
      style={{
        background: "linear-gradient(to bottom, #fff7ed, #fff)",
        minHeight: "100vh",
      }}
    >
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
        <meta
          property="og:title"
          content="Dishtalgia - Warning: May cause extreme pudding cravings."
        />
        <meta
          property="og:description"
          content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX."
        />
        <meta
          property="og:image"
          content="https://dishtalgia.com/dbfbp.png"
        />
        <meta property="og:url" content="https://dishtalgia.com/" />
        <style>
          {`
            .product-card {
              background: #ffffff;
              border-radius: 12px;
              border: 1px solid rgba(255, 152, 0, 0.2);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .product-card:hover {
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
            .modern-select .MuiOutlinedInput-root {
              border-radius: 8px;
              background: #fff;
              border: 1px solid rgba(255, 152, 0, 0.3);
              color: #333;
            }
            .modern-select .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
              border-color: #ff9800;
            }
            .modern-select .MuiSvgIcon-root {
              color: #ff9800;
            }
            .modern-select .MuiSelect-select {
              color: #333;
            }
            .modern-select .MuiInputLabel-root {
              color: #555;
            }
            .modern-select .MuiInputLabel-root.Mui-focused {
              color: #ff9800;
            }
            .modern-select .MuiOutlinedInput-notchedOutline {
              border-color: rgba(255, 152, 0, 0.3);
            }
          `}
        </style>
      </Helmet>

      <Container sx={{ py: { xs: 4, sm: 6 } }}>
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
            Welcome to Dishtalgia
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              color: "#ff9800",
              fontWeight: "bold",
              textShadow: "0.5px 1px 3px rgba(0, 0, 0, 0.5)",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Home of the Best Banana Pudding in Houston!
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: "#555",
              textShadow: "0.5px 1px 3px rgba(0, 0, 0, 0.3)",
              mt: 2,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Try a sample of our delicious banana pudding! Available at:{" "}
            <a
              href="https://twistedcreole.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff6f61", textDecoration: "none" }}
            >
              Twisted Creole Food Truck, on Saturdays.
            </a>{" "}
            | Located @ Porky's Backyard, 5131 Atascocita Road, Humble, TX 77346
          </Typography>
        </motion.div>

        {/* Product Showcase */}
        <Box mt={6}>
          <Grid container spacing={3} justifyContent="center">
            {products.map(({ id, to, img, alt, label, price }, index) => (
              <Grid item xs={12} sm={6} md={4} key={label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
                  className="product-card"
                >
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
                      <motion.img
                        src={img}
                        alt={alt}
                        style={{
                          maxWidth: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        loading="lazy"
                      />
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          mt: 2,
                          color: "#333",
                          fontFamily: "'Roboto', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {label}
                      </Typography>
                    </Link>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "center",
                      }}
                    >
                      <FormControl className="modern-select" sx={{ minWidth: 140 }}>
                        <InputLabel>Size</InputLabel>
                        <Select
                          value={selections[label].size}
                          onChange={(e) =>
                            handleSelectionChange(label, "size", e.target.value)
                          }
                        >
                          <MenuItem value="Regular">
                            Regular (${price.Regular.toFixed(2)})
                          </MenuItem>
                          <MenuItem value="Family">
                            Family (${price.Family.toFixed(2)})
                          </MenuItem>
                          <MenuItem value="Pan">
                            Pan (${price.Pan.toFixed(2)})
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl className="modern-select" sx={{ minWidth: 100 }}>
                        <InputLabel>Quantity</InputLabel>
                        <Select
                          value={selections[label].quantity}
                          onChange={(e) =>
                            handleSelectionChange(
                              label,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5].map((num) => (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Button
                      onClick={() => handleAddToCart({ id, label, price })}
                      className="modern-button"
                      sx={{ mt: 3 }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Fun Facts */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 4 },
            mt: 6,
            mb: 5,
            background: "#f8f8f8",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
              mb: 2,
              fontFamily: "'Roboto', sans-serif",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            🍌 Fun Facts About Banana Pudding! 🍮
          </Typography>
          <Box
            component="ul"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1.2rem" },
              color: "#555",
              lineHeight: 1.8,
              pl: 2,
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {[
              "Banana pudding has been a Southern dessert favorite since the late 19th century.",
              'The first known banana pudding recipe was published in 1878 in "Housekeeping in Old Virginia".',
              "Traditional banana pudding is made with vanilla wafers, bananas, and custard—but we made ours even better! 😉",
              "There's an Annual National Banana Pudding Festival held in Tennessee every October! 🎉",
            ].map((fact, idx) => (
              <Typography key={idx} component="li">
                {fact}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* Subscription Section */}
        <Box textAlign="center" mt={6}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <Typography
              variant="h3"
              sx={{
                mb: 2,
                fontWeight: "bold",
                color: "rgb(55,55,55)",
                fontFamily: "'Roboto', sans-serif",
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
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