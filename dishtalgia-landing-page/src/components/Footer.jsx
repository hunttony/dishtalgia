import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        padding: "20px 0",
        textAlign: "center",
        marginTop: 50,
      }}
    >
      <Typography variant="body2" color="white">
        © 2025 Dishtalgia. All Rights Reserved.
      </Typography>
      <div className="social-links" style={{ marginTop: 10 }}>
        <a
          href="https://instagram.com/sweetdishtalgia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png"
            alt="Instagram"
          />
        </a>
        <a
          href="https://tiktok.com/@sweetdishtalgia"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/tiktok.png"
            alt="TikTok"
          />
        </a>
        
      </div>
      
    </footer>
  );
};

export default Footer;