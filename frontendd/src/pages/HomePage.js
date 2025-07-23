import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Import and use sample products with real images
    const loadFeaturedProducts = async () => {
      try {
        const { getFeaturedProducts } = await import('../data/sampleProducts');
        const featured = getFeaturedProducts();
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error loading featured products:', error);
        // Fallback to mock data if import fails
        const mockProducts = [
          {
            _id: 1,
            name: 'Classic Boho Crochet Tote',
            price: 45.99,
            image: '/knotty1.jpg',
            description: 'A beautiful handcrafted crochet tote bag with a timeless boho design.',
            category: 'Tote Bags',
            featured: true
          },
          {
            _id: 2,
            name: 'Elegant Market Crochet Bag',
            price: 52.99,
            image: '/knotty2.jpg',
            description: 'An elegant and spacious market-style crochet bag perfect for shopping.',
            category: 'Market Bags',
            featured: true
          }
        ];
        setFeaturedProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const categories = [
    {
      name: 'Tote Bags',
      image: '/knotty1.jpg',
      description: 'Perfect for everyday use',
      count: 12
    },
    {
      name: 'Clutches',
      image: '/knotty2.jpg',
      description: 'Chic and compact for evenings',
      count: 8
    },
    {
      name: 'Sleeves',
      image: '/knotty4.jpg',
      description: 'Protect your devices in style',
      count: 6
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'I absolutely love my crochet tote! The quality is amazing and it\'s perfect for my daily commute.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      text: 'The market bag exceeded my expectations. It\'s both beautiful and practical for shopping.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      text: 'Bought the evening clutch for my wife\'s birthday. She loves it and gets compliments everywhere!',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Handcrafted with Love</h1>
          <p>Discover unique crochet bags that combine artistry with functionality. Each piece is carefully crafted by hand, ensuring quality and style that lasts.</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">Shop Now</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/knotty1.jpg" alt="ThisIsKnotty Crochet Bags" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                  <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                </svg>
              </div>
              <h3>Handmade Quality</h3>
              <p>Each bag is carefully crafted by hand, ensuring unique quality and attention to detail.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Secure Shopping</h3>
              <p>Your payment information is protected with industry-standard security measures.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3>Customer Support</h3>
              <p>Our dedicated team is here to help you with any questions or concerns.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3>Fast Shipping</h3>
              <p>Quick delivery to your doorstep with tracking information provided.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Discover our most popular handcrafted crochet bags</p>
          </div>
          {loading ? (
            <div className="loading">Loading featured products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="view-all-container">
            <Link to="/products" className="btn-primary">View All Products</Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect bag for every occasion</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={`/products?category=${category.name}`} key={index} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-count">{category.count} products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real feedback from happy customers</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in the Loop</h2>
            <p>Subscribe to our newsletter for exclusive offers, new product launches, and crochet tips!</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 