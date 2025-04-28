import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import OriginalBananaPudding from "./product/original-banana-pudding";
import BananasFosterPudding from "./product/bananas-foster-pudding";
import Order from "./pages/Order";
import ThankYou from "./pages/ThankYou";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/original-banana-pudding"
            element={<OriginalBananaPudding />}
          />
          <Route
            path="/product/bananas-foster-pudding"
            element={<BananasFosterPudding />}
          />
          <Route path="/order" element={<Order />} />
          <Route path="/thank-you/:orderId" element={<ThankYou />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;