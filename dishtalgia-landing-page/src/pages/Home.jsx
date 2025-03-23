import Reac, {useEffect} from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.mailerlite.com/js/universal.js";
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          if (window.ml) {
            window.ml("account", "1404622");
          }
        };
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
  return (
    <div className="Home">
      {/* SEO Optimization */}
      <Helmet>
        <title>Dishtalgia - The Best Banana Pudding in Houston</title>
        <meta name="description" content="Indulge in the best banana pudding from Dishtalgia. Order now and enjoy delicious desserts in Houston & Humble, TX." />
        <meta name="keywords" content="banana pudding, dessert, Houston, Humble TX, Dishtalgia, Bananas Foster" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Main Content */}
      <Container sx={{ paddingY: 4 }}>

      
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2,
           
                fontFamily:"cursive",
                textShadow: "rgb(255, 55, 0) 1px 1px 10px",
                color: "rgb(55,55,55)", // Added for readability on dark background
             
           }}>
            Welcome to Dishtalgia
          </Typography>
          
          <Typography variant="h5" sx={{ color: "orange", fontWeight: "bold", textShadow: "rgb(0, 0, 0) .5px 1px 3px" }}>
            Home of the Best Banana Pudding in Houston!
          </Typography>
          <Typography variant="h5" sx={{ fontSize:"14px",color: "black", textShadow: "rgb(0, 0, 0) .5px 1px 3px" }}>Try a sample of our delicious banana pudding!
      Available at: Twisted Creole Food Truck | Located @ Porky's Backyard 5131 Atascocita Road, Humble, TX 77346</Typography>
        </motion.div>

        {/* Product Showcase */}
        <Box display="flex" justifyContent="center" gap={3} marginTop={4} sx={{ flexWrap: "wrap" }}>
          {/* Original Banana Pudding */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center", maxWidth: 300, backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
              <Link to="/product/original-banana-pudding" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/DOBP.png" alt="Original Banana Pudding" style={{ width: "100%", borderRadius: 10 }} />
                <Typography variant="h6">Original Banana Pudding - $8</Typography>
              </Link>
            </Paper>
          </motion.div>

          {/* Bananas Foster Banana Pudding */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <Paper elevation={4} sx={{ padding: 2, textAlign: "center", maxWidth: 300, backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
              <Link to="/product/bananas-foster-pudding" style={{ textDecoration: "none", color: "inherit" }}>
                <img src="/DBFBP.png" alt="Bananas Foster Banana Pudding" style={{ width: "100%", borderRadius: 10 }} />
                <Typography variant="h6">Bananas Foster Pudding - $10</Typography>
              </Link>
            </Paper>
          </motion.div>
        </Box>

        {/* Fun Facts Section */}
        <Paper elevation={6} sx={{ padding: 4, marginTop: 5, backgroundColor: "#f8f8f8" }}>
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
          {/*<Paper elevation={6} sx={{ padding: 4, textAlign: "center", backgroundColor: "#222", color: "#FFD700" }}>
            <Typography variant="h5">Subscribe for Updates</Typography>
            <form>
              <Box display="flex" gap={2} justifyContent="center" marginTop={2} sx={{ flexWrap: "wrap" }}>
                <input type="email" placeholder="Enter your email" style={{ padding: "10px", borderRadius: "5px", width: "250px" }} />
                <Button type="submit" variant="contained" color="success">
                  Subscribe
                </Button>
              </Box>
            </form>
          </Paper>*/}
          <div class="ml-embedded" data-form="CEF1JJ"></div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;