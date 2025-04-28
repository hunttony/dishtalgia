const express = require('express');
const cors = require('cors');
const paypal = require('@paypal/checkout-server-sdk');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');

dotenv.config();
console.log('dotenv: Loaded');
console.log('PAYPAL_CLIENT_ID:', process.env.PAYPAL_CLIENT_ID ? 'Loaded' : 'Missing');
console.log('PAYPAL_CLIENT_SECRET:', process.env.PAYPAL_CLIENT_SECRET ? 'Loaded' : 'Missing');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
const ordersFile = path.join(__dirname, 'orders.json');

async function readOrders() {
  try {
    const data = await fs.readFile(ordersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    await writeOrders([]);
    return [];
  }
}

async function writeOrders(orders) {
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
}

app.post('/api/orders', async (req, res) => {
  const { cart, subtotal, deliveryFee, total } = req.body;
  console.log('Received /api/orders request:', { cart, subtotal, deliveryFee, total });

  if (!cart || !subtotal || !deliveryFee || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: total,
          breakdown: {
            item_total: { currency_code: 'USD', value: subtotal },
            shipping: { currency_code: 'USD', value: deliveryFee },
          },
        },
        items: cart.map(item => ({
          name: item.name,
          unit_amount: item.unit_amount,
          quantity: item.quantity,
        })),
      },
    ],
  });

  try {
    const order = await client.execute(request);
    console.log('PayPal order created:', order.result.id);
    res.status(201).json({ id: order.result.id });
  } catch (err) {
    console.error('Error creating PayPal order:', err);
    res.status(500).json({ error: 'Failed to create order', details: err.message, paypalError: err });
  }
});

app.post('/api/orders/:orderID/capture', async (req, res) => {
  const { orderID } = req.params;
  const { cart, subtotal, deliveryFee, total } = req.body;
  console.log('Received /api/orders/capture request for orderID:', orderID);

  if (!cart || !subtotal || !deliveryFee || !total) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    console.log('PayPal capture response:', capture.result.status);
    if (capture.result.status === 'COMPLETED') {
      const orders = await readOrders();
      orders.push({
        orderID,
        cart,
        subtotal,
        deliveryFee,
        total,
        timestamp: new Date().toISOString(),
      });
      await writeOrders(orders);
      console.log('Order saved to orders.json:', orderID);
    }
    res.status(200).json(capture.result);
  } catch (err) {
    console.error('Error capturing PayPal order:', err);
    res.status(500).json({ error: 'Failed to capture order', details: err.message, paypalError: err });
  }
});

app.get('/api/orders/:orderID', async (req, res) => {
  const { orderID } = req.params;
  console.log('Received /api/orders/:orderID request for orderID:', orderID);

  try {
    const orders = await readOrders();
    const order = orders.find(o => o.orderID === orderID);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({
      orderID: order.orderID,
      customerName: 'Valued Customer',
      items: order.cart,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      timestamp: order.timestamp
    });
  } catch (err) {
    console.error('Error retrieving order:', err);
    res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});