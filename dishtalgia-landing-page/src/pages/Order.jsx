import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cart from '../components/Cart';

const Order = () => {
  return (
    <>
      <Helmet>
        <title>Order Banana Pudding - Dishtalgia</title>
        <meta
          name="description"
          content="Order the best banana pudding online from Dishtalgia and enjoy our delicious treats!"
        />
        <link rel="canonical" href="https://dishtalgia.com/order" />
      </Helmet>
      <Cart />
    </>
  );
};

export default Order;