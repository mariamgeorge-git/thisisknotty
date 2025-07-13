import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Get filters from URL params
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'name';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const inStock = searchParams.get('inStock') === 'true';

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Import sample products data
        const { sampleProducts, categories: productCategories } = await import('../data/sampleProducts');
        setProducts(sampleProducts);
        setCategories(productCategories);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handleSortChange = (newSortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', newSortBy);
    setSearchParams(params);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (search) count++;
    if (category !== 'all') count++;
    if (minPrice || maxPrice) count++;
    if (inStock) count++;
    return count;
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="loading-spinner">Loading beautiful crochet bags...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Our Crochet Bags</h1>
            <p>Discover our collection of handcrafted crochet bags, each made with love and attention to detail.</p>
          </div>
          <div className="header-stats">
            <span>{products.length} Products</span>
            {getActiveFiltersCount() > 0 && (
              <button onClick={clearFilters} className="clear-filters">
                Clear Filters ({getActiveFiltersCount()})
              </button>
            )}
          </div>
        </div>

        <div className="products-content">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <ProductFilter
              categories={categories}
              currentFilters={{
                search,
                category,
                minPrice,
                maxPrice,
                inStock
              }}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Products Section */}
          <main className="products-main">
            {/* Products Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <span className="results-count">
                  Showing {products.length} products
                </span>
              </div>
              
              <div className="toolbar-right">
                <div className="view-mode-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('grid')}
                    title="Grid View"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('list')}
                    title="List View"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="sort-dropdown">
                  <label htmlFor="sort-select">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products List */}
            <ProductList
              filters={{
                search,
                category,
                priceRange: {
                  min: minPrice ? parseFloat(minPrice) : 0,
                  max: maxPrice ? parseFloat(maxPrice) : 1000
                },
                inStock
              }}
              sortBy={sortBy}
              viewMode={viewMode}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 