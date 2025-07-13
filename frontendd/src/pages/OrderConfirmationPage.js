import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getOrderById(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="error-message">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/orders')}>View My Orders</button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="error-message">
            <h2>Order Not Found</h2>
            <button onClick={() => navigate('/orders')}>View My Orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been successfully placed and is being processed.</p>
        </div>

        <div className="order-details">
          <div className="order-info">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Order Number:</span>
                <span className="value">{order.orderNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Order Date:</span>
                <span className="value">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="info-item">
                <span className="label">Total Amount:</span>
                <span className="value total">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info">
            <h3>Shipping Address</h3>
            <div className="address-details">
              <p><strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong></p>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
              <p>{order.shippingInfo.country}</p>
              <p>Email: {order.shippingInfo.email}</p>
              <p>Phone: {order.shippingInfo.phone}</p>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <img 
                    src={item.product?.images?.[0] || '/placeholder-product.jpg'} 
                    alt={item.product?.name || 'Product'}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                  <div className="item-details">
                    <h4>{item.product?.name || 'Product'}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>What's Next?</h2>
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">📧</div>
              <h4>Order Confirmation Email</h4>
              <p>You'll receive a confirmation email with your order details shortly.</p>
            </div>
            <div className="step-item">
              <div className="step-icon">📦</div>
              <h4>Order Processing</h4>
              <p>We'll start preparing your handmade crochet bags with care and attention.</p>
            </div>
            <div className="step-item">
              <div className="step-icon">🚚</div>
              <h4>Shipping Updates</h4>
              <p>You'll receive tracking information once your order ships.</p>
            </div>
            <div className="step-item">
              <div className="step-icon">🎉</div>
              <h4>Enjoy Your Purchase</h4>
              <p>Your beautiful handmade crochet bags will arrive at your doorstep!</p>
            </div>
          </div>
        </div>

        <div className="contact-info">
          <h3>Need Help?</h3>
          <p>If you have any questions about your order, please don't hesitate to contact us:</p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>support@thisisknotty.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">💬</span>
              <span>Live Chat Available</span>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button 
            className="btn-primary"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button 
            className="btn-secondary"
            onClick={handleViewOrders}
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 