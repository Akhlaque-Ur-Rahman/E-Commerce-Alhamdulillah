import React from 'react';
import { Link } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';

export const FloatingCart: React.FC = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Link to="/cart">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <Badge className="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center p-0 bg-accent text-accent-foreground">
              {count}
            </Badge>
          </motion.button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
