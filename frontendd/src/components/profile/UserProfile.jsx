import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || ''
  });

  // Mock data for demonstration
  const [wishlist] = useState([
    {
      id: 1,
      name: 'Cozy Crochet Tote',
      price: 45.99,
      image: '/placeholder-bag.jpg',
      color: 'Sage Green',
      size: 'Medium'
    },
    {
      id: 2,
      name: 'Boho Market Bag',
      price: 52.99,
      image: '/placeholder-bag.jpg',
      color: 'Terracotta',
      size: 'Large'
    }
  ]);

  const [orderHistory] = useState([
    {
      id: 'TIK12345678',
      date: '2024-01-15',
      status: 'Delivered',
      total: 98.97,
      items: [
        { name: 'Cozy Crochet Tote', quantity: 1, price: 45.99 },
        { name: 'Boho Market Bag', quantity: 1, price: 52.98 }
      ]
    },
    {
      id: 'TIK12345679',
      date: '2024-01-10',
      status: 'Processing',
      total: 45.99,
      items: [
        { name: 'Cozy Crochet Tote', quantity: 1, price: 45.99 }
      ]
    }
  ]);

  const [shippingAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      firstName: 'Jane',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      firstName: 'Jane',
      lastName: 'Doe',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#27ae60';
      case 'Processing': return '#f39c12';
      case 'Shipped': return '#3498db';
      default: return '#7f8c8d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="user-profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Account</h1>
          <p>Welcome back, {user?.firstName || 'User'}!</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <nav className="profile-nav">
              <button
                className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Profile Information
              </button>
              
              <button
                className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Order History
              </button>
              
              <button
                className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('wishlist')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Wishlist
              </button>
              
              <button
                className={`nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Shipping Addresses
              </button>
              
              <button
                className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Security Settings
              </button>
            </nav>
          </div>

          <div className="profile-main">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Profile Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="edit-btn"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Order History Tab */}
            {activeTab === 'orders' && (
              <div className="profile-section">
                <h2>Order History</h2>
                <div className="orders-list">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Order #{order.id}</h3>
                          <p className="order-date">{formatDate(order.date)}</p>
                        </div>
                        <div className="order-status">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {order.status}
                          </span>
                          <p className="order-total">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span>{item.name}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="order-actions">
                        <button className="btn-secondary">View Details</button>
                        <button className="btn-secondary">Track Order</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="profile-section">
                <h2>My Wishlist</h2>
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <p>Color: {item.color}</p>
                        <p>Size: {item.size}</p>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="item-actions">
                        <button className="btn-primary">Add to Cart</button>
                        <button className="btn-secondary">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="profile-section">
                <div className="section-header">
                  <h2>Shipping Addresses</h2>
                  <button className="add-btn">Add New Address</button>
                </div>
                
                <div className="addresses-grid">
                  {shippingAddresses.map((address) => (
                    <div key={address.id} className="address-card">
                      <div className="address-header">
                        <h3>{address.type}</h3>
                        {address.isDefault && <span className="default-badge">Default</span>}
                      </div>
                      
                      <div className="address-details">
                        <p>{address.firstName} {address.lastName}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                      
                      <div className="address-actions">
                        <button className="btn-secondary">Edit</button>
                        <button className="btn-secondary">Delete</button>
                        {!address.isDefault && (
                          <button className="btn-primary">Set as Default</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings Tab */}
            {activeTab === 'security' && (
              <div className="profile-section">
                <h2>Security Settings</h2>
                
                <div className="security-settings">
                  <div className="setting-card">
                    <div className="setting-info">
                      <h3>Change Password</h3>
                      <p>Update your account password for better security</p>
                    </div>
                    <button className="btn-primary">Change Password</button>
                  </div>
                  
                  <div className="setting-card">
                    <div className="setting-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>
                  
                  <div className="setting-card">
                    <div className="setting-info">
                      <h3>Login History</h3>
                      <p>View recent login activity on your account</p>
                    </div>
                    <button className="btn-secondary">View History</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 