import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const product = getProductById(productId || '');
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">Product not found</h2>
        <Link to="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / 
        <Link to={`/category/${product.category}`} className="hover:text-primary"> {product.category}</Link> / 
        <span className="text-foreground"> {product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={images[selectedImage]}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${index + 1}`} className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-playfair mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center bg-primary text-primary-foreground px-3 py-1 rounded">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {product.rating}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
                <Badge className="bg-accent text-accent-foreground">
                  {product.discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-2 border-x">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {product.inStock ? (
                <span className="text-sm text-green-600">In Stock</span>
              ) : (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-primary text-primary-foreground h-12"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              onClick={handleWishlistToggle}
              variant="outline"
              className="h-12 px-6"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-5 h-5 text-primary" />
              <span>Free delivery on orders above ₹500</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>100% authentic & quality guaranteed</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="w-5 h-5 text-primary" />
              <span>Easy return & exchange within 7 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger value="description" className="rounded-none border-b-2 data-[state=active]:border-primary">
            Description
          </TabsTrigger>
          <TabsTrigger value="ingredients" className="rounded-none border-b-2 data-[state=active]:border-primary">
            Ingredients
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none border-b-2 data-[state=active]:border-primary">
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p className="mt-4">
              At ALHAMDULILLAH BAKERY, we take pride in creating the finest bakery products using
              premium ingredients and traditional recipes. Each product is crafted with care to
              ensure the highest quality and taste.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="ingredients" className="pt-6">
          <div>
            <h3 className="mb-4">Ingredients</h3>
            {product.ingredients ? (
              <ul className="list-disc list-inside space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No ingredient information available.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            {/* Sample Reviews */}
            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4>Ayesha Khan</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Absolutely delicious! The quality is excellent and the taste is amazing. Highly
                recommended!
              </p>
            </div>

            <div className="border-b pb-6">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4>Rahul Sharma</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Best bakery products in Patna. Fresh and delivered on time. Will definitely order
                again!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
