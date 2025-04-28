import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../context/CartContext';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Checkbox, 
  FormControlLabel, 
  Card, 
  CardContent, 
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

// Styled components
const ModernCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(1),
  },
}));

const StyledTableContainer = styled(Box)(({ theme }) => ({
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '4px',
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  minWidth: '600px',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  background: 'linear-gradient(to right, #ff6f61, #ffb88c)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right, #ff4f41, #ff986c)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 2),
    fontSize: '0.85rem',
  },
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    padding: theme.spacing(1),
  },
}));

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [paypalError, setPaypalError] = useState(null);
  const [includeDelivery, setIncludeDelivery] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const deliveryFee = 7.00;
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const total = includeDelivery ? subtotal + deliveryFee : subtotal;
    return total.toFixed(2);
  };

  const createOrder = async () => {
    const orderData = {
      cart: cart.map(item => ({
        name: `${item.name} (${item.size})`,
        unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
        quantity: item.quantity.toString(),
      })),
      subtotal: calculateSubtotal(),
      deliveryFee: includeDelivery ? deliveryFee.toFixed(2) : '0.00',
      total: calculateTotal(),
    };

    console.log('Sending cart to /api/orders:', orderData);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
      }
      const { id } = await response.json();
      console.log('Order created:', id);
      return id;
    } catch (error) {
      console.error('Error creating order:', error.message, error.stack);
      setPaypalError(`Failed to create PayPal order: ${error.message}. Please try again or contact support.`);
      throw error;
    }
  };

  const onApprove = async (data) => {
    const orderData = {
      cart: cart.map(item => ({
        name: `${item.name} (${item.size})`,
        unit_amount: { currency_code: 'USD', value: item.price.toFixed(2) },
        quantity: item.quantity.toString(),
      })),
      subtotal: calculateSubtotal(),
      deliveryFee: includeDelivery ? deliveryFee.toFixed(2) : '0.00',
      total: calculateTotal(),
    };

    console.log('Capturing order:', data.orderID, orderData);
    try {
      const response = await fetch(`/api/orders/${data.orderID}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
      }
      const result = await response.json();
      console.log('Capture result:', result);
      if (result.status === 'COMPLETED') {
        clearCart();
        setOrderDetails({
          cart: orderData.cart,
          subtotal: orderData.subtotal,
          deliveryFee: includeDelivery ? deliveryFee : 0,
          total: orderData.total,
        });
        setOrderId(data.orderID);
        setThankYouOpen(true);
      } else {
        setPaypalError(`Payment failed: ${result.status || 'Unknown status'}. Please try again or contact support.`);
      }
    } catch (error) {
      console.error('Error in onApprove:', error.message, error.stack);
      setPaypalError(`Failed to capture PayPal order: ${error.message}. Please try again or contact support.`);
    }
  };

  const handleDialogClose = () => {
    setThankYouOpen(false);
    if (orderId) {
      console.log('Navigating to:', `/thank-you/${orderId}`);
      navigate(`/thank-you/${orderId}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 6 }, background: 'linear-gradient(to bottom, #fff7ed, #fff)' }}>
      <CenteredBox>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 3, sm: 6 }, 
            fontWeight: 700, 
            color: '#333',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Your Cart
        </Typography>
        {cart.length === 0 ? (
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', borderRadius: '12px', width: '100%' }}>
            <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Your cart is empty.{' '}
              <Link to="/" style={{ color: '#ff6f61', textDecoration: 'none' }}>
                Shop now
              </Link>.
            </Typography>
          </Paper>
        ) : (
          <ModernCard sx={{ width: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <StyledTableContainer>
                <StyledTable>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Quantity</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow 
                        key={`${item.id}-${item.size}`} 
                        sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' } }}
                      >
                        <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.name}</TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.size}</TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)}
                            style={{ 
                              width: '60px', 
                              padding: '8px', 
                              borderRadius: '4px', 
                              border: '1px solid #ddd',
                              fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <StyledButton 
                            onClick={() => removeFromCart(item.id, item.size)} 
                            color="error"
                            size="small"
                          >
                            Remove
                          </StyledButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </StyledTable>
              </StyledTableContainer>
              <Box 
                sx={{ 
                  mt: 4, 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' }, 
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeDelivery}
                      onChange={(e) => setIncludeDelivery(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Add $7.00 Delivery Fee"
                  sx={{ color: '#555', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                />
                <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Typography variant="h6" sx={{ color: '#555', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    Subtotal: ${calculateSubtotal()}
                  </Typography>
                  {includeDelivery && (
                    <Typography variant="h6" sx={{ color: '#555', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                      Delivery Fee: ${deliveryFee.toFixed(2)}
                    </Typography>
                  )}
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mt: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                    Total: ${calculateTotal()}
                  </Typography>
                </Box>
              </Box>
              {paypalError && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  {paypalError}
                </Typography>
              )}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <StyledButton
                  variant="contained"
                  size="large"
                >
                  Proceed to Checkout
                </StyledButton>
              </Box>
              {cart.length > 0 && (
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <PayPalScriptProvider options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: 'USD' }}>
                    <Box sx={{ maxWidth: '400px', width: '100%' }}>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(err) => {
                          console.error('PayPal SDK error:', err.message, err.stack);
                          setPaypalError(`Checkout failed: ${err.message}. Please try again or contact support.`);
                        }}
                        style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
                      />
                    </Box>
                  </PayPalScriptProvider>
                </Box>
              )}
              <Dialog 
                open={thankYouOpen} 
                onClose={handleDialogClose}
                fullWidth
                maxWidth="md"
                sx={{ '& .MuiDialog-paper': { width: { xs: '90%', sm: '80%', md: '600px' }, m: { xs: 1, sm: 2 } } }}
              >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, color: '#333', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                  Thank You for Your Purchase!
                </DialogTitle>
                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                    Order Summary
                  </Typography>
                  {orderDetails && (
                    <>
                      <StyledTableContainer>
                        <StyledTable>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Item</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Size</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Price</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Quantity</TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Total</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orderDetails.cart.map((item) => (
                              <TableRow key={`${item.name}`}>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.name.split(' (')[0]}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.name.match(/\((.*?)\)/)[1]}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>${item.unit_amount.value}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{item.quantity}</TableCell>
                                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>${(item.unit_amount.value * item.quantity).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </StyledTable>
                      </StyledTableContainer>
                      <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          Subtotal: ${orderDetails.subtotal}
                        </Typography>
                        {orderDetails.deliveryFee > 0 && (
                          <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Delivery Fee: ${orderDetails.deliveryFee.toFixed(2)}
                          </Typography>
                        )}
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                          Total: ${orderDetails.total}
                        </Typography>
                      </Box>
                    </>
                  )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', p: { xs: 1, sm: 2 } }}>
                  <StyledButton onClick={handleDialogClose} variant="contained">
                    Continue
                  </StyledButton>
                </DialogActions>
              </Dialog>
            </CardContent>
          </ModernCard>
        )}
      </CenteredBox>
    </Container>
  );
  
};

export default Cart;