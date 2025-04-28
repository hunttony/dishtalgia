import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([
    { name: 'Banana Pudding', unit_amount: { currency_code: 'USD', value: '10.00' }, quantity: '1' }
  ]);
  const [deliveryInfo, setDeliveryInfo] = useState({ name: '', address: '', phone: '' });
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity), 0).toFixed(2);
  const deliveryFee = '7.00';
  const total = (parseFloat(subtotal) + parseFloat(deliveryFee)).toFixed(2);

  const createOrder = async () => {
    try {
      console.log('Creating order with:', { cart, subtotal, deliveryFee, total, deliveryInfo });
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, subtotal, deliveryFee, total, deliveryInfo })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
      }
      const { id } = await response.json();
      console.log('Order created:', id);
      return id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = - (data) => {
    try {
      console.log('Capturing order:', data.orderID);
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, subtotal, deliveryFee, total, deliveryInfo })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
      }
      const result = await response.json();
      console.log('Capture result:', result);
      if (result.status === 'COMPLETED') {
        navigate(`/thank-you/${data.orderID}`);
      } else {
        console.error('Capture failed:', result);
        alert(`Payment failed: ${JSON.stringify(result)}`);
      }
    } catch (error) {
      console.error('Error in onApprove:', error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={deliveryInfo.name}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
          placeholder="Full Name"
        />
        <input
          type="text"
          value={deliveryInfo.address}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
          placeholder="Address"
        />
        <input
          type="text"
          value={deliveryInfo.phone}
          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
          placeholder="Phone Number"
        />
      </form>
      <PayPalScriptProvider options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default Cart;