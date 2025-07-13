import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import './UserOrdersPage.css';

const UserOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const data = await orderAPI.getUserOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(selectedOrder?.id === order.id ? null : order);
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderAPI.cancelOrder(orderId);
        fetchUserOrders(); // Refresh orders
      } catch (err) {
        alert('Failed to cancel order: ' + err.message);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'processing':
        return 'processing';
      case 'shipped':
        return 'shipped';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="user-orders-page">
        <div className="orders-container">
          <div className="loading-spinner">Loading your orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-orders-page">
        <div className="orders-container">
          <div className="error-message">
            <h2>Error Loading Orders</h2>
            <p>{error}</p>
            <button onClick={fetchUserOrders}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your orders and view order history</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header" onClick={() => handleOrderClick(order)}>
                  <div className="order-info">
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">{formatDate(order.createdAt)}</p>
                    <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button className="expand-btn">
                      {selectedOrder?.id === order.id ? '−' : '+'}
                    </button>
                  </div>
                </div>

                {selectedOrder?.id === order.id && (
                  <div className="order-details">
                    <div className="details-grid">
                      <div className="shipping-details">
                        <h4>Shipping Address</h4>
                        <div className="address-info">
                          <p><strong>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</strong></p>
                          <p>{order.shippingInfo.address}</p>
                          <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
                          <p>{order.shippingInfo.country}</p>
                          <p>Email: {order.shippingInfo.email}</p>
                          <p>Phone: {order.shippingInfo.phone}</p>
                        </div>
                      </div>

                      <div className="order-summary">
                        <h4>Order Summary</h4>
                        <div className="summary-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="summary-item">
                              <img 
                                src={item.product?.images?.[0] || '/placeholder-product.jpg'} 
                                alt={item.product?.name || 'Product'}
                                onError={(e) => {
                                  e.target.src = '/placeholder-product.jpg';
                                }}
                              />
                              <div className="item-info">
                                <h5>{item.product?.name || 'Product'}</h5>
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
                    </div>

                    <div className="order-breakdown">
                      <h4>Order Breakdown</h4>
                      <div className="breakdown-items">
                        <div className="breakdown-item">
                          <span>Subtotal:</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Tax:</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Shipping:</span>
                          <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="breakdown-item total">
                          <span>Total:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="order-notes">
                        <h4>Order Notes</h4>
                        <p>{order.notes}</p>
                      </div>
                    )}

                    <div className="order-actions">
                      {order.status.toLowerCase() === 'pending' && (
                        <button 
                          className="btn-secondary"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      )}
                      
                      {order.trackingNumber && (
                        <div className="tracking-info">
                          <h4>Tracking Information</h4>
                          <p>Tracking Number: <strong>{order.trackingNumber}</strong></p>
                          <a 
                            href={`https://tracking.example.com/${order.trackingNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                          >
                            Track Package
                          </a>
                        </div>
                      )}

                      <button 
                        className="btn-primary"
                        onClick={() => navigate(`/order-confirmation/${order.id}`)}
                      >
                        View Order Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersPage; 