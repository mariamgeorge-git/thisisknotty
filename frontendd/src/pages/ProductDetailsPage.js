import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, userAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../components/auth/AuthContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
    if (user) {
      checkWishlistStatus();
    }
  }, [productId, user]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const wishlist = await userAPI.getWishlist();
      setIsInWishlist(wishlist.some(item => item.productId === productId));
    } catch (err) {
      console.error('Error checking wishlist status:', err);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity
    });
  };

  const handleWishlistToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setWishlistLoading(true);
      if (isInWishlist) {
        await userAPI.removeFromWishlist(productId);
        setIsInWishlist(false);
      } else {
        await userAPI.addToWishlist(productId);
        setIsInWishlist(true);
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-details-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-details-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-container">
        <div className="error-message">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span onClick={() => navigate('/products')}>Products</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details-grid">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images[selectedImage] || '/placeholder-product.jpg'} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/placeholder-product.jpg';
                }}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            
            <div className="product-meta">
              <div className="product-rating">
                <span className="stars">★★★★☆</span>
                <span className="rating-text">(4.0)</span>
              </div>
              <div className="product-sku">SKU: {product.sku}</div>
            </div>

            <div className="product-price">
              <span className="current-price">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">${product.originalPrice}</span>
              )}
              {product.discountPercentage && (
                <span className="discount-badge">{product.discountPercentage}% OFF</span>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-details">
              <div className="detail-item">
                <span className="label">Category:</span>
                <span className="value">{product.category}</span>
              </div>
              <div className="detail-item">
                <span className="label">Material:</span>
                <span className="value">{product.material}</span>
              </div>
              <div className="detail-item">
                <span className="label">Dimensions:</span>
                <span className="value">{product.dimensions}</span>
              </div>
              <div className="detail-item">
                <span className="label">Care Instructions:</span>
                <span className="value">{product.careInstructions}</span>
              </div>
            </div>

            <div className="product-availability">
              <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.inStock && (
                <span className="stock-count">{product.stockQuantity} available</span>
              )}
            </div>

            {product.inStock && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max={product.stockQuantity}
                    />
                    <button 
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      disabled={quantity >= product.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn-primary add-to-cart"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                  
                  <button 
                    className={`btn-secondary wishlist-btn ${isInWishlist ? 'in-wishlist' : ''}`}
                    onClick={handleWishlistToggle}
                    disabled={wishlistLoading}
                  >
                    {wishlistLoading ? '...' : isInWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
                  </button>
                </div>
              </div>
            )}

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Handmade with love and care</li>
                <li>Premium quality materials</li>
                <li>Unique design for each piece</li>
                <li>Perfect for everyday use</li>
                <li>Eco-friendly and sustainable</li>
              </ul>
            </div>

            <div className="shipping-info">
              <h3>Shipping & Returns</h3>
              <p>Free shipping on orders over $50. Returns accepted within 30 days.</p>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          <div className="reviews-summary">
            <div className="average-rating">
              <span className="rating-number">4.0</span>
              <span className="stars">★★★★☆</span>
              <span className="total-reviews">Based on 12 reviews</span>
            </div>
          </div>
          
          {/* Placeholder for reviews */}
          <div className="reviews-placeholder">
            <p>Reviews will be displayed here once customers start leaving them.</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {/* Placeholder for related products */}
            <p>Related products will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage; 