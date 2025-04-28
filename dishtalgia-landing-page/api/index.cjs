const paypal = require('@paypal/checkout-server-sdk');
const fs = require('fs').promises;
const path = require('path');

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);
const ordersFile = path.join(process.env.VERCEL ? '/tmp' : __dirname, 'orders.json');

async function readOrders() {
  try {
    const data = await fs.readFile(ordersFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function writeOrders(orders) {
  await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2));
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.VERCEL_URL || 'http://localhost:5180');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url;
  if (path === '/api/orders') {
    const { cart, subtotal, deliveryFee, total, deliveryInfo } = req.body;
    console.log('Received /api/orders request:', { cart, subtotal, deliveryFee, total, deliveryInfo });

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
      console.error('Error creating PayPal order:', err);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else if (path.match(/^\/api\/orders\/[^/]+\/capture$/)) {
    const orderID = path.split('/')[3];
    const { cart, subtotal, deliveryFee, total, deliveryInfo } = req.body;
    console.log('Received /api/orders/capture request for orderID:', orderID);

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
          deliveryInfo,
          timestamp: new Date().toISOString(),
        });
        await writeOrders(orders);
        console.log('Order saved to orders.json:', orderID);
      }
      res.status(200).json(capture.result);
    } catch (err) {
      console.error('Error capturing PayPal order:', err);
      res.status(500).json({ error: 'Failed to capture order' });
    }
  } else if (path.match(/^\/api\/orders\/[^/]+$/)) {
    const orderID = path.split('/')[3];
    console.log('Received /api/orders/:orderID request for orderID:', orderID);

    try {
      const orders = await readOrders();
      const order = orders.find(o => o.orderID === orderID);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (err) {
      console.error('Error retrieving order:', err);
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  } else {
    res.status(404).json({ error: 'Not found' });
  }
};