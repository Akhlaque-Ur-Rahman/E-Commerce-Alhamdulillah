import React from 'react';
import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Heart className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save your favorite items to your wishlist!
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
      <h1 className="text-3xl font-playfair mb-8">My Wishlist ({wishlist.length} items)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
