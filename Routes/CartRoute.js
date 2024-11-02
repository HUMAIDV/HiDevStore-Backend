import express, { json, response } from 'express';
import { CartMod } from '../Models/CartModel.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const cartRouter = express.Router();

cartRouter.post('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    const { items } = req.body;
  
    try {
      const existingCart = await CartMod.findOne({ userId });
  
      if (existingCart) {
        existingCart.items = items;
        await existingCart.save();
        res.status(200).json({ message: 'Cart updated' });
      } else {
        const newCart = new CartMod({ userId, items });
        await newCart.save();
        res.status(201).json({ message: 'Cart created' });
      }
    } catch (error) {
      console.error('Error saving cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  
  cartRouter.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cart = await CartMod.findOne({ userId });
  
      if (cart) {
        res.status(200).json(cart.items);
      } else {
        res.status(404).json({ message: 'Cart not found' });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default cartRouter;
