import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/auth/AuthContext';
import { userAPI } from '../services/api';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || ''
  });

  const [newAddress, setNewAddress] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    isDefault: false
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [ordersData, wishlistData, addressesData] = await Promise.all([
        userAPI.getUserOrders(),
        userAPI.getUserWishlist(),
        userAPI.getUserAddresses()
      ]);
      setOrders(ordersData);
      setWishlist(wishlistData);
      setAddresses(addressesData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedUser = await userAPI.updateProfile(profileData);
      updateUser(updatedUser);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newAddressData = await userAPI.addAddress(newAddress);
      setAddresses([...addresses, newAddressData]);
      setNewAddress({
        type: 'home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        isDefault: false
      });
      setMessage('Address added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to add address: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressDelete = async (addressId) => {
    try {
      await userAPI.deleteAddress(addressId);
      setAddresses(addresses.filter(addr => addr._id !== addressId));
      setMessage('Address deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to delete address: ' + error.message);
    }
  };

  const handleWishlistRemove = async (productId) => {
    try {
      await userAPI.removeFromWishlist(productId);
      setWishlist(wishlist.filter(item => item._id !== productId));
      setMessage('Item removed from wishlist!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to remove item: ' + error.message);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: '👤' },
    { id: 'orders', label: 'Order History', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'addresses', label: 'Shipping Addresses', icon: '📍' },
    { id: 'security', label: 'Security', icon: '🔒' }
  ];

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="user-info">
              <div className="user-avatar">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <h3>{user?.firstName} {user?.lastName}</h3>
              <p>{user?.email}</p>
              <span className="user-role">{user?.role}</span>
            </div>

            <nav className="profile-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="profile-main">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <h2>Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="tab-content">
                <h2>Order History</h2>
                {loading ? (
                  <div className="loading">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>No Orders Yet</h3>
                    <p>Start shopping to see your order history here.</p>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map(order => (
                      <div key={order._id} className="order-item">
                        <div className="order-header">
                          <span className="order-number">#{order.orderNumber}</span>
                          <span className={`order-status ${order.status}`}>{order.status}</span>
                        </div>
                        <div className="order-details">
                          <p>Total: ${order.total.toFixed(2)}</p>
                          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="tab-content">
                <h2>My Wishlist</h2>
                {loading ? (
                  <div className="loading">Loading wishlist...</div>
                ) : wishlist.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">❤️</div>
                    <h3>Wishlist is Empty</h3>
                    <p>Add items to your wishlist to see them here.</p>
                  </div>
                ) : (
                  <div className="wishlist-grid">
                    {wishlist.map(item => (
                      <div key={item._id} className="wishlist-item">
                        <img src={item.image} alt={item.name} />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>${item.price.toFixed(2)}</p>
                          <button 
                            onClick={() => handleWishlistRemove(item._id)}
                            className="btn-remove"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="tab-content">
                <h2>Shipping Addresses</h2>
                <div className="addresses-section">
                  <div className="addresses-list">
                    {addresses.map(address => (
                      <div key={address._id} className="address-item">
                        <div className="address-info">
                          <h4>{address.type} Address</h4>
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                          {address.isDefault && <span className="default-badge">Default</span>}
                        </div>
                        <button 
                          onClick={() => handleAddressDelete(address._id)}
                          className="btn-remove"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleAddressAdd} className="address-form">
                    <h3>Add New Address</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="addressType">Address Type</label>
                        <select
                          id="addressType"
                          value={newAddress.type}
                          onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="street">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="zipCode">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          value={newAddress.country}
                          onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                        />
                        Set as default address
                      </label>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? 'Adding...' : 'Add Address'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <h2>Security Settings</h2>
                <div className="security-section">
                  <div className="security-item">
                    <h3>Change Password</h3>
                    <p>Update your account password for better security.</p>
                    <button className="btn-secondary">Change Password</button>
                  </div>
                  <div className="security-item">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account.</p>
                    <button className="btn-secondary">Enable 2FA</button>
                  </div>
                  <div className="security-item">
                    <h3>Account Deletion</h3>
                    <p>Permanently delete your account and all associated data.</p>
                    <button className="btn-danger">Delete Account</button>
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

export default ProfilePage; 