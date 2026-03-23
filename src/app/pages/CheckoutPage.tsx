import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = getCartTotal() >= 500 ? 0 : 50;
  const total = getCartTotal() + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    toast.success('Order placed successfully!');
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-3xl font-playfair mb-4">Order Placed Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for your order. We'll start preparing your items right away.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order confirmation has been sent to your email.
          </p>
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="hidden sm:inline">Address</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="hidden sm:inline">Payment</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
              3
            </div>
            <span className="hidden sm:inline">Review</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card className="p-6">
              <h2 className="text-xl mb-6">Delivery Address</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" required />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" defaultValue="Patna" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" defaultValue="Bihar" required />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input id="pincode" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground">
                  Continue to Payment
                </Button>
              </form>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-xl mb-6">Payment Method</h2>
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Banknote className="w-5 h-5" />
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5" />
                      UPI / PhonePe / Google Pay
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5" />
                      Credit / Debit Card
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary text-primary-foreground">
                    Place Order
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3">
                  <ImageWithFallback src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm line-clamp-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
              {cart.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  +{cart.length - 3} more items
                </p>
              )}
            </div>

            <div className="border-t pt-4 space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-xl text-primary">₹{total}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
