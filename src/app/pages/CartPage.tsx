import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const deliveryFee = getCartTotal() >= 500 ? 0 : 50;
  const discount = 0;
  const total = getCartTotal() + deliveryFee - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some delicious bakery products to get started!
          </p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair mb-8">Shopping Cart ({getCartCount()} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
              >
                <Card className="p-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="mb-1 hover:text-primary">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Price */}
                          <div>
                            <span className="text-lg text-primary">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 border-x">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => {
                            removeFromCart(item.id);
                            toast.info('Item removed from cart');
                          }}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-₹{discount}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between">
                <span>Total</span>
                <span className="text-xl text-primary">₹{total}</span>
              </div>
            </div>

            {deliveryFee > 0 && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4 text-sm">
                <p className="text-accent-foreground">
                  Add ₹{500 - getCartTotal()} more to get FREE delivery!
                </p>
              </div>
            )}

            <Button
              onClick={handleCheckout}
              className="w-full bg-primary text-primary-foreground h-12 mb-3"
            >
              Proceed to Checkout
            </Button>

            <Link to="/">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>

            {/* Features */}
            <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
              <p>✓ Cash on Delivery Available</p>
              <p>✓ Easy Returns & Exchange</p>
              <p>✓ 100% Authentic Products</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
