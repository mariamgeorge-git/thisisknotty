import React from 'react';
import { Link } from 'react-router-dom';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <div className="unauthorized-content">
          <div className="unauthorized-icon">
            <span role="img" aria-label="lock">🔒</span>
          </div>
          
          <h1>Access Denied</h1>
          
          <p className="unauthorized-message">
            Sorry, you don't have permission to access this page. 
            This area is restricted to authorized users only.
          </p>
          
          <div className="unauthorized-actions">
            <Link to="/" className="btn-primary">
              Go to Home
            </Link>
            
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
          
          <div className="unauthorized-help">
            <p>
              If you believe you should have access to this page, please contact support.
            </p>
            <Link to="/contact" className="contact-link">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 