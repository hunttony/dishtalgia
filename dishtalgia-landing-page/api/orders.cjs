const paypal = require('@paypal/checkout-server-sdk');
const { MongoClient } = require('mongodb');

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
const mongoUri = process.env.MONGODB_URI;

async function getMongoClient() {
  try {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
    await client.connect();
    return client;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

async function writeOrder(order) {
  let client;
  try {
    client = await getMongoClient();
    const db = client.db('dishtalgia');
    await db.collection('orders').insertOne(order);
  } catch (err) {
    console.error('Error writing order to MongoDB:', err);
    throw err;
  } finally {
    if (client) await client.close();
  }
}

async function getOrder(orderID) {
  let client;
  try {
    client = await getMongoClient();
    const db = client.db('dishtalgia');
    return await db.collection('orders').findOne({ orderID });
  } catch (err) {
    console.error('Error retrieving order from MongoDB:', err);
    throw err;
  } finally {
    if (client) await client.close();
  }
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url;
  if (path === '/api/orders' && req.method === 'POST') {
    const { cart, subtotal, deliveryFee, total } = req.body;
    console.log('Received /api/orders request:', JSON.stringify({ cart, subtotal, deliveryFee, total }, null, 2));

    if (!cart || !subtotal || !deliveryFee || !total) {
      return res.status(400).json({ error: 'Invalid request body: missing required fields' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    const requestBody = {
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
    };
    request.requestBody(requestBody);

    try {
      const order = await client.execute(request);
      res.status(201).json({ id: order.result.id });
    } catch (err) {
      res.status(500).json({ error: 'Failed to create order', details: err.message, paypalError: err });
    }
  } else if (path.match(/^\/api\/orders\/[^/]+\/capture$/) && req.method === 'POST') {
    const orderID = path.split('/')[3];
    const { cart, subtotal, deliveryFee, total } = req.body;

    if (!cart || !subtotal || !deliveryFee || !total) {
      return res.status(400).json({ error: 'Invalid request body: missing required fields' });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
      const capture = await client.execute(request);
      if (capture.result.status === 'COMPLETED') {
        await writeOrder({
          orderID,
          cart,
          subtotal,
          deliveryFee,
          total,
          timestamp: new Date().toISOString(),
        });
      }
      res.status(200).json(capture.result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to capture order', details: err.message, paypalError: err });
    }
  } else if (path.match(/^\/api\/orders\/[^/]+$/) && req.method === 'GET') {
    const orderID = path.split('/')[3];
    try {
      const order = await getOrder(orderID);
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
      res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};