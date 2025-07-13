import React from 'react';
import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = ({ order }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateOrderNumber = () => {
    return 'TIK' + Date.now().toString().slice(-8);
  };

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Order Number:</span>
                <span className="value">{generateOrderNumber()}</span>
              </div>
              <div className="info-item">
                <span className="label">Order Date:</span>
                <span className="value">{formatDate(order.orderDate)}</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value status-pending">Pending</span>
              </div>
              <div className="info-item">
                <span className="label">Total Amount:</span>
                <span className="value total-amount">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <div className="shipping-details">
              <p><strong>{order.shipping.firstName} {order.shipping.lastName}</strong></p>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
              <p>{order.shipping.country}</p>
              <p>Email: {order.shipping.email}</p>
              <p>Phone: {order.shipping.phone}</p>
            </div>
          </div>

          <div className="order-items-summary">
            <h3>Items Ordered</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="item-row">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Color: {item.color}</p>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${(order.total - 5.99).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>$5.99</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Order Processing</h4>
                <p>We'll review your order and begin processing it within 24 hours.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Handmade with Love</h4>
                <p>Your crochet bag will be carefully crafted by hand, taking 3-5 business days.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Shipping</h4>
                <p>Once ready, your order will be shipped with tracking information sent to your email.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/profile/orders" className="btn-secondary">
            View My Orders
          </Link>
        </div>

        <div className="contact-info">
          <p>Questions about your order? Contact us at <a href="mailto:support@thisisknotty.com">support@thisisknotty.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 