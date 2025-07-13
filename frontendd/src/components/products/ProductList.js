import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { sampleProducts } from '../../data/sampleProducts';
import './ProductList.css';

const ProductList = ({ filters = {}, sortBy = 'name', viewMode = 'grid' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with sample data
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProducts = [...sampleProducts];

        // Apply filters
        if (filters.category && filters.category !== 'all') {
          filteredProducts = filteredProducts.filter(
            product => product.category === filters.category
          );
        }

        if (filters.priceRange) {
          filteredProducts = filteredProducts.filter(
            product => product.price >= filters.priceRange.min && 
                      product.price <= filters.priceRange.max
          );
        }

        if (filters.inStock) {
          filteredProducts = filteredProducts.filter(
            product => product.inStock
          );
        }

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(
            product => 
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        }

        // Apply sorting
        filteredProducts.sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'name':
              return a.name.localeCompare(b.name);
            case 'rating':
              return b.rating - a.rating;
            case 'newest':
              return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            default:
              return 0;
          }
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters, sortBy]);

  if (loading) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner">Loading beautiful crochet bags...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <div className="empty-icon">🧶</div>
        <h3>No Products Found</h3>
        <p>We couldn't find any crochet bags matching your criteria.</p>
        <p>Try adjusting your filters or browse our full collection.</p>
      </div>
    );
  }

  return (
    <div className={`product-list ${viewMode}`}>
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductList; 