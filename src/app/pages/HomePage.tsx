import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { categories, getBestSellers, getTodaysDeals, getNewArrivals } from '../data/products';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const heroSlides = [
  {
    title: 'Premium Bakery Products',
    subtitle: 'Freshly Baked with Love',
    description: 'Experience the finest quality bakery items',
    cta: 'Shop Now',
    bgColor: 'from-primary to-primary/80',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200',
  },
  {
    title: 'Special Discount Up to 30% OFF',
    subtitle: "Today's Best Deals",
    description: 'On selected cookies, cakes & more',
    cta: 'Grab Deals',
    bgColor: 'from-accent to-accent/80',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200',
  },
  {
    title: 'Fresh Breads Daily',
    subtitle: 'Delivered to Your Doorstep',
    description: 'Order before 8 AM for same-day delivery',
    cta: 'Order Now',
    bgColor: 'from-primary to-primary/80',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1200',
  },
];

const testimonials = [
  {
    name: 'Ayesha Khan',
    rating: 5,
    comment: 'Best bakery in Patna! Their cookies are absolutely delicious.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'Fresh products delivered on time. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Fatima Ahmed',
    rating: 5,
    comment: 'The cakes are amazing! Perfect for every celebration.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Amit Kumar',
    rating: 5,
    comment: 'Quality products at reasonable prices. Very satisfied!',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
];

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bestSellers = getBestSellers();
  const todaysDeals = getTodaysDeals();
  const newArrivals = getNewArrivals();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${heroSlides[currentSlide].bgColor}`}
          >
            <div className="absolute inset-0">
              <img
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                className="w-full h-full object-cover opacity-30"
              />
            </div>
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg mb-2 font-playfair"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl font-playfair mb-4"
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl mb-8"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    {heroSlides[currentSlide].cta}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-playfair mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Deals */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-playfair mb-2">Today's Best Deals</h2>
              <p className="text-muted-foreground">Limited time offers - Don't miss out!</p>
            </div>
            <Link to="/category/cookies">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-playfair mb-2">Best Sellers</h2>
            <p className="text-muted-foreground">Most loved by our customers</p>
          </div>
          <Link to="/category/cookies">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-playfair mb-2">New Arrivals</h2>
                <p className="text-muted-foreground">Check out our latest products</p>
              </div>
              <Link to="/category/cookies">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-playfair mb-8 text-center">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🎂</div>
            <h3 className="mb-2">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Only the finest ingredients used in all our products
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Same-day delivery available across Patna
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">💯</div>
            <h3 className="mb-2">100% Fresh</h3>
            <p className="text-sm text-muted-foreground">
              Baked daily with love and care
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">
              Competitive prices without compromising quality
            </p>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm opacity-90">{testimonial.comment}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-secondary rounded-lg p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for exclusive deals and new product launches
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="bg-primary text-primary-foreground">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
