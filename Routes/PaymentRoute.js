// Routes/PaymentRoute.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const paymentRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// console.log(process.env.STRIPE_SECRET_KEY);
// console.log(process.env.CLIENT_URL);

// Create Checkout Session
paymentRouter.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body; // `items` should be an array of objects with { title, price, quantity }

  try {
    // Create line items array for Stripe
    const lineItems = items.map(item => {
      return {
        price_data: {
          currency: 'usd', 
          // currency: 'INR', // Set currency to INR
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100, // Stripe expects the amount in the smallest currency unit (paisa for INR)
        },
        quantity: item.quantity,
      };
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/canceled`,
      invoice_creation: {
        enabled: true, // Enable invoice creation
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

export default paymentRouter;
