import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OriginalBananaPudding from "./product/original-banana-pudding";
import BananasFosterPudding from "./product/bananas-foster-pudding";
import Order from "./pages/Order";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
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
          path="/order"
          element={<Order />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
