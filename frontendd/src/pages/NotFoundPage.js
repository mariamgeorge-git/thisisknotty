import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <div className="not-found-icon">🧶</div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! It looks like this page got tangled up in our yarn. The page you're looking for doesn't exist.</p>
          
          <div className="not-found-actions">
            <button 
              className="btn-primary"
              onClick={handleGoBack}
            >
              Go Back
            </button>
            
            <Link to="/" className="btn-secondary">
              Go Home
            </Link>
            
            <Link to="/products" className="btn-outline">
              Browse Products
            </Link>
          </div>

          <div className="helpful-links">
            <h3>Looking for something specific?</h3>
            <div className="links-grid">
              <Link to="/products" className="helpful-link">
                <span className="link-icon">🛍️</span>
                <span>Shop Our Bags</span>
              </Link>
              
              <Link to="/about" className="helpful-link">
                <span className="link-icon">ℹ️</span>
                <span>About Us</span>
              </Link>
              
              <Link to="/contact" className="helpful-link">
                <span className="link-icon">📞</span>
                <span>Contact Support</span>
              </Link>
              
              <Link to="/login" className="helpful-link">
                <span className="link-icon">👤</span>
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 