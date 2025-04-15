import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OriginalBananaPudding from "./product/original-banana-pudding";
import BananasFosterPudding from "./product/bananas-foster-pudding";
import Order from "./pages/Order";
import Header from "./components/Header"; // Adjust path based on your folder structure
import Footer from "./components/Footer"; // Adjust path based on your folder structure

const App = () => {
  returFootern (
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
        <Route
          path="/Order"
          element={<Order />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;