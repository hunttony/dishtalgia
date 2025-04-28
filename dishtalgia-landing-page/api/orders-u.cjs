const paypal = require('@paypal/checkout-server-sdk');
const { MongoClient } = require('mongodb');

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
const mongoClient = new MongoClient(process.env.MONGODB_URI);

console.log('VERCEL env:', process.env.VERCEL);
console.log('PAYPAL_CLIENT_ID:', process.env.PAYPAL_CLIENT_ID ? 'Set' : 'Missing');
console.log('PAYPAL_CLIENT_SECRET:', process.env.PAYPAL_CLIENT_SECRET ? 'Set' : 'Missing');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Missing');

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  console.error('PayPal credentials missing. Capture will fail.');
}
if (!process.env.MONGODB_URI) {
  console.error('MongoDB URI missing. Database operations will fail.');
}

module.exports = async (req, res) => {
  const path = req.url;

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (path === '/api/orders' && req.method === 'POST') {
    const { cart, subtotal, deliveryFee, total, deliveryInfo } = req.body;
    console.log('Received /api/orders request:', { cart, subtotal, deliveryFee, total, deliveryInfo });

    if (!cart || !subtotal || !deliveryFee || !total || !deliveryInfo) {
      return res.status(400).json({ error: 'Invalid request body' });
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
          shipping: deliveryInfo ? {
            name: { full_name: deliveryInfo.name },
            address: {
              address_line_1: deliveryInfo.address,
              country_code: 'US',
            },
          } : null,
        },
      ],
    });

    try {
      const order = await client.execute(request);
      console.log('PayPal order created:', order.result.id);
      res.status(201).json({ id: order.result.id });
    } catch (err) {
      console.error('Error creating PayPal order:', err.message, err.stack, JSON.stringify(err));
      res.status(500).json({ error: 'Failed to create order', details: err.message });
    }
  } else if (path.match(/^\/api\/orders\/[^/]+\/capture$/) && req.method === 'POST') {
    const orderID = path.split('/')[3];
    const { cart, subtotal, deliveryFee, total, deliveryInfo } = req.body;
    console.log('Received /api/orders/capture request for orderID:', orderID, 'body:', req.body);

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
      const capture = await client.execute(request);
      console.log('PayPal capture response:', capture.result.status);
      if (capture.result.status === 'COMPLETED') {
        if (!cart || !subtotal || !deliveryFee || !total || !deliveryInfo) {
          console.warn('Invalid or missing req.body for storage, skipping database save');
        } else {
          await mongoClient.connect();
          const db = mongoClient.db('dishtalgia');
          const collection = db.collection('orders');
          await collection.insertOne({
            orderID,
            cart,
            subtotal,
            deliveryFee,
            total,
            deliveryInfo,
            timestamp: new Date().toISOString()
          });
          console.log('Order saved to MongoDB:', orderID);
        }
      }
      res.status(200).json(capture.result);
    } catch (err) {
      console.error('Error capturing PayPal order:', err.message, err.stack, JSON.stringify(err));
      res.status(500).json({ error: 'Failed to capture order', details: err.message });
    } finally {
      await mongoClient.close();
    }
  } else if (path.match(/^\/api\/orders\/[^/]+$/) && req.method === 'GET') {
    const orderID = path.split('/')[3];
    console.log('Received /api/orders/:orderID request for orderID:', orderID);

    try {
      await mongoClient.connect();
      const db = mongoClient.db('dishtalgia');
      const collection = db.collection('orders');
      const order = await collection.findOne({ orderID });
      await mongoClient.close();
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: 'Order not found' });
      }
    } catch (err) {
      console.error('Error retrieving order:', err.message, err.stack, JSON.stringify(err));
      res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};