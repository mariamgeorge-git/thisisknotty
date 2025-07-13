import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import './AdminProductsPage.css';

const AdminProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.deleteProduct(productId);
        fetchProducts(); // Refresh the list
      } catch (err) {
        alert('Failed to delete product: ' + err.message);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="admin-products-page">
        <div className="products-container">
          <div className="loading-spinner">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-products-page">
        <div className="products-container">
          <div className="error-message">
            <h2>Error Loading Products</h2>
            <p>{error}</p>
            <button onClick={fetchProducts}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-products-page">
      <div className="products-container">
        <div className="products-header">
          <div className="header-content">
            <h1>Manage Products</h1>
            <p>Create, edit, and manage your crochet bag inventory</p>
          </div>
          <button 
            className="btn-primary"
            onClick={() => navigate('/admin/products/create')}
          >
            Add New Product
          </button>
        </div>

        <div className="products-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="products-stats">
            <span>Total Products: {products.length}</span>
            <span>Showing: {filteredProducts.length}</span>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <div className="no-products-icon">🛍️</div>
              <h3>No Products Found</h3>
              <p>No products match your search criteria.</p>
              <button 
                className="btn-primary"
                onClick={() => navigate('/admin/products/create')}
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.images?.[0] || '/placeholder-product.jpg'} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="product-overlay">
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">
                    {product.description.substring(0, 100)}...
                  </p>
                  
                  <div className="product-meta">
                    <span className="product-category">{product.category}</span>
                    <span className="product-price">${product.price}</span>
                  </div>

                  <div className="product-status">
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    {product.inStock && (
                      <span className="stock-count">{product.stockQuantity} available</span>
                    )}
                  </div>

                  <div className="product-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                    >
                      Edit Product
                    </button>
                    <button 
                      className="btn-outline"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage; 