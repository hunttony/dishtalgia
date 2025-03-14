import React from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Dishtalgia
        </motion.h1>
        

        <motion.div
          className="chef-spotlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          
          <img src="/dishtalgia_label1.png" alt="Chef Tennisha" className="chef-photo" />
          <p>
            Try a sample of our delicious banana pudding!
            
            <p style={{ color: 'black' }}>Available at:</p>

             
              </p>
                <p style={{ color: 'black' }}>  Twisted Creole Food Truck | Located @ Porky's Backyard - 5131 Atascocita Road, Humble, TX 77346</p>
          
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <button className="cta-button">Explore Menu</button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          
        </motion.p>

        
        <motion.div
          className="subscribe-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <h2>Join Our Community</h2>
          <p>Get updates and special offers directly to your inbox.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </motion.div>

        <div className="social-links">
          <a href="https://facebook.com/dishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/facebook.png" alt="Facebook" />
          </a>
          <a href="https://instagram.com/sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="Instagram" />
          </a>
          <a href="https://twitter.com/dishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" />
          </a>
          <a href="https://tiktok.com/@sweetdishtalgia" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/ios-filled/50/000000/tiktok.png" alt="TikTok" />
          </a>
        </div>
        
      </header>
    </div>
  );
}

export default App;