import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "./App.css";

const App = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleSubscribe = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (response.ok) {
        alert("Subscription successful!");
      } else {
        const errorData = await response.json();
        alert(`Subscription failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      alert("An error occurred. Please try again.");
    }
    reset();
  };

  return (
    <div className="App">
      {/* SEO */}
      <Helmet>
        <title>Dishtalgia - Best Banana Pudding in Houston</title>
        <meta name="description" content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX." />
        <meta name="keywords" content="banana pudding, dessert, Houston, Humble TX, Dishtalgia, Bananas Foster" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img src="/dishtalgia_label1.png" alt="Dishtalgia Logo" style={{ height: 50, borderRadius: "30px" }} />
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            📞 832-617-3766
          </Typography>
          <Button variant="contained" color="warning">
            Order Now
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ paddingY: 4 }}>
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Welcome to Dishtalgia
          </Typography>
          <Typography variant="h5" sx={{ color: "#FFD700", fontWeight: "bold" }}>
            Home of the Best Banana Pudding!
          </Typography>
        </motion.div>

        {/* Product Showcase */}
        <Box display="flex" justifyContent="center" gap={3} marginTop={4}>
          {/* Original Banana Pudding */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center", maxWidth: 300 }}>
              <a href="/product/original-banana-pudding" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="DOBP.png" alt="Original Banana Pudding" style={{ width: "100%", borderRadius: 10 }} />
                <Typography variant="h6">Original Banana Pudding - $8</Typography>
              </a>
            </Paper>
          </motion.div>

          {/* Bananas Foster Banana Pudding */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center", maxWidth: 300 }}>
              <a href="/product/bananas-foster-banana-pudding" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="DBFBP.png" alt="Bananas Foster Banana Pudding" style={{ width: "100%", borderRadius: 10 }} />
                <Typography variant="h6">Bananas Foster Pudding - $10</Typography>
              </a>
            </Paper>
          </motion.div>
        </Box>

        {/* Fun Facts Section */}
        <Paper elevation={6} sx={{ padding: 4, margin: 5, backgroundColor: "#f8f8f8" }}>
          <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#333", marginBottom: 2 }}>
            🍌 Fun Facts About Banana Pudding! 🍮
          </Typography>
          <ul style={{ fontSize: "1.2rem", color: "#555", lineHeight: "1.8" }}>
            <li>Banana pudding has been a **Southern dessert favorite** since the late 19th century.</li>
            <li>The first known banana pudding recipe was published in **1878** in "Housekeeping in Old Virginia".</li>
            <li>Traditional banana pudding is made with **vanilla wafers, bananas, and custard**—but we made ours even better! 😉</li>
            <li>There's an **Annual National Banana Pudding Festival** held in Tennessee every October! 🎉</li>
          </ul>
        </Paper>

        {/* Subscription Section */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} marginTop={4}>
          <Paper elevation={6} sx={{ padding: 4, textAlign: "center", backgroundColor: "#222", color: "#FFD700" }}>
            <Typography variant="h5">Subscribe for Updates</Typography>
            <form onSubmit={handleSubmit(handleSubscribe)}>
              <Box display="flex" gap={2} justifyContent="center" marginTop={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                />
                <Button type="submit" variant="contained" color="success">
                  Subscribe
                </Button>
              </Box>
            </form>
          </Paper>
        </motion.div>
      </Container>

      {/* Footer */}
      <footer style={{ backgroundColor: "transparent", padding: "20px 0", textAlign: "center", marginTop: 50 }}>
        <Typography variant="body2" color="white">© 2025 Dishtalgia. All Rights Reserved.</Typography>
        <div className="social-links" style={{ marginTop: 10 }}>
          <a href="https://instagram.com/sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://tiktok.com/@sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/tiktok.png" alt="TikTok" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
