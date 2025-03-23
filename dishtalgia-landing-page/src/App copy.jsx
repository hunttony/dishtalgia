import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import "./App.css";

const App = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  const handleContactSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during contact submission:", error);
      alert("An error occurred. Please try again.");
    }
    reset();
  };

  return (

    <div className="App">
      <Helmet>
        <title>Dishtalgia - Delicious Banana Pudding</title>
        <meta name="description" content="Enjoy the best banana pudding at Dishtalgia. Subscribe for updates and contact us for more information." />
        <meta name="keywords" content="banana pudding, Dishtalgia, dessert, food truck, Humble TX, Houston TX, Bananas Foster  " />
      </Helmet>

      <header className="App-header">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Dishtalgia
        </motion.h1>

        {/* Chef Spotlight Section */}
        <motion.div
          className="chef-spotlight"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="/dishtalgia_label1.png"
            alt="Chef Tennisha the best comfort foods chef in houston"
            className="chef-photo"
          />
        </motion.div>

        <motion.div
          className="chef-spotlight"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            Try a sample of our delicious banana pudding! 🍌🍮
          </Typography>
          <Typography variant="body1" sx={{ color: "white" }}>
            Available at:
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#FFD700", fontWeight: "bold" }}
          >
            Twisted Creole Food Truck | Located @ Porky's Backyard <br /> 5131
            Atascocita Road, Humble, TX 77346
          </Typography>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="contact-info-display"
          initial={{ scale: 0 }}
          animate={{ scale: 0.75 }}
          transition={{ delay: 1, duration: 0.5 }}>
          <h2>email: info@dishtalgia.com</h2>
          <h2>phone: 832-617-3766</h2>
        </motion.div>

        {/* Product Showcase */}
        <motion.div
          className="product-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2>Available Now</h2>
          <h3>Family and party sizes upon request!</h3>
          <div className="product-scroll">
            <div className="product">
              <img src="DOBP.png" alt="Best Original Banana Pudding in Houston" />
              <p>Original Banana Pudding - $8</p>
            </div>
            <div className="product">
              <img src="DBFBP.png" alt="Best Bananas Foster Banana Pudding in Houston" />
              <p>Bananas Foster Banana Pudding - $10</p>
            </div>
          </div>
        </motion.div>

        {/* Subscription Form *
        <motion.div
          className="subscribe-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "rgb(254, 211, 37)",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Subscribe for Updates
            </Typography>
            <form onSubmit={handleSubmit(handleSubscribe)}>
              <Box display="flex" gap={2} justifyContent="center">
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#28a745", color: "white", borderRadius: 2 }}
                >
                  Subscribe
                </Button>
              </Box>
            </form>
          </Paper>
        </motion.div>*/}

        {/* Contact Us Form */}
        {/*<motion.div
          className="subscribe-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "rgb(254, 211, 37)",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit(handleContactSubmit)}>
              <Box display="flex" flexDirection="column" gap={2}>
                {/* Name Fields */}
                {/*<Box display="flex" gap={2}>
                  <TextField
                    label="First Name*"
                    variant="outlined"
                    fullWidth
                    {...register("firstName", { required: "First name is required" })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    sx={{ backgroundColor: "white", borderRadius: 2 }}
                  />
                  <TextField
                    label="Last Name*"
                    variant="outlined"
                    fullWidth
                    {...register("lastName", { required: "Last name is required" })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    sx={{ backgroundColor: "white", borderRadius: 2 }}
                  />
                </Box>

                {/* Email */}
                {/*<TextField
                  label="Email*"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...register("contactEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.contactEmail}
                  helperText={errors.contactEmail?.message}
                  sx={{ backgroundColor: "white", borderRadius: 2 }}
                />

                {/* Inquiry Type */}
                {/*<FormControl fullWidth>
                  <InputLabel>Inquiry Type*</InputLabel>
                  <Select
                    {...register("inquiryType", { required: "Inquiry type is required" })}
                    error={!!errors.inquiryType}
                    sx={{ backgroundColor: "white", borderRadius: 2 }}
                  >
                    <MenuItem value="general">General Inquiry</MenuItem>
                    <MenuItem value="support">Support</MenuItem>
                    <MenuItem value="feedback">Feedback</MenuItem>
                  </Select>
                </FormControl>

                {/* Message */}
                {/*</header><TextareaAutosize
                  minRows={4}
                  placeholder="Enter your message*"
                  {...register("contactMessage", { required: "Message is required" })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
                {errors.contactMessage && (
                  <Typography color="error" variant="body2">
                    {errors.contactMessage.message}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#28a745", color: "white", borderRadius: 2 }}
                >
                  Send Message
                </Button>
              </Box>
            </form>
          </Paper>
        </motion.div>*/}
      </header>
      
      <footer>
      <div className="social-links">
          
          <a href="https://instagram.com/sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" />
          </a>
         
          <a href="https://tiktok.com/@sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/tiktok.png" alt="TikTok" />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default App;