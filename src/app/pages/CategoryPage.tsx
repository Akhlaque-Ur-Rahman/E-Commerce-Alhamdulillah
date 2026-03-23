import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory, categories } from '../data/products';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

type SortOption = 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams();
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const category = categories.find((c) => c.id === categoryId);
  const allProducts = getProductsByCategory(categoryId || '');

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) => selectedRatings.some((r) => p.rating >= r));
    }

    return filtered;
  }, [allProducts, priceRange, selectedRatings]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.filter((p) => p.isNew).concat(sorted.filter((p) => !p.isNew));
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.reviews - a.reviews);
    }
  }, [filteredProducts, sortBy]);

  const handleRatingFilter = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedRatings([]);
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="mb-4">Customer Ratings</h4>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => handleRatingFilter(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                {rating}★ & above
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="mb-4">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="in-stock" defaultChecked />
            <label htmlFor="in-stock" className="text-sm cursor-pointer">
              In Stock
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <span>Home</span> / <span>{category?.name || 'Products'}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-playfair mb-2">{category?.name}</h1>
        <p className="text-muted-foreground">
          Showing {sortedProducts.length} of {allProducts.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border rounded-lg p-6">
            <FilterSection />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort & Filter Bar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-white border rounded-lg">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found matching your filters.</p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Filters</h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <FilterSection />
            <Button
              className="w-full mt-6"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
