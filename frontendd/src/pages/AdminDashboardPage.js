import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminAPI.getDashboardStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'create-product':
        navigate('/admin/products/create');
        break;
      case 'view-orders':
        navigate('/admin/orders');
        break;
      case 'view-users':
        navigate('/admin/users');
        break;
      case 'view-products':
        navigate('/admin/products');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="dashboard-container">
          <div className="loading-spinner">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <div className="dashboard-container">
          <div className="error-message">
            <h2>Error Loading Dashboard</h2>
            <p>{error}</p>
            <button onClick={fetchDashboardStats}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with ThisIsKnotty today.</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
              <span className="stat-change positive">+12.5% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats?.totalOrders || 0}</p>
              <span className="stat-change positive">+8.3% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total Customers</h3>
              <p className="stat-value">{stats?.totalCustomers || 0}</p>
              <span className="stat-change positive">+15.2% from last month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛍️</div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <p className="stat-value">{stats?.totalProducts || 0}</p>
              <span className="stat-change neutral">No change</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button 
              className="action-card"
              onClick={() => handleQuickAction('create-product')}
            >
              <div className="action-icon">➕</div>
              <h3>Add New Product</h3>
              <p>Create a new crochet bag listing</p>
            </button>

            <button 
              className="action-card"
              onClick={() => handleQuickAction('view-orders')}
            >
              <div className="action-icon">📋</div>
              <h3>View Orders</h3>
              <p>Manage and track customer orders</p>
            </button>

            <button 
              className="action-card"
              onClick={() => handleQuickAction('view-users')}
            >
              <div className="action-icon">👥</div>
              <h3>Manage Users</h3>
              <p>View and manage customer accounts</p>
            </button>

            <button 
              className="action-card"
              onClick={() => handleQuickAction('view-products')}
            >
              <div className="action-icon">🛍️</div>
              <h3>Manage Products</h3>
              <p>Edit and manage product listings</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {stats?.recentOrders?.map((order, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">📦</div>
                <div className="activity-content">
                  <h4>New Order #{order.orderNumber}</h4>
                  <p>${order.total.toFixed(2)} • {order.customerName}</p>
                  <span className="activity-time">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="activity-status">
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            )) || (
              <div className="no-activity">
                <p>No recent activity to display.</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="analytics-overview">
          <h2>Analytics Overview</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Sales This Month</h3>
              <div className="analytics-chart">
                <div className="chart-placeholder">
                  <p>📈 Sales chart will be displayed here</p>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Top Products</h3>
              <div className="top-products">
                {stats?.topProducts?.map((product, index) => (
                  <div key={index} className="product-item">
                    <span className="product-rank">#{index + 1}</span>
                    <span className="product-name">{product.name}</span>
                    <span className="product-sales">{product.sales} sold</span>
                  </div>
                )) || (
                  <p>No product data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="system-status">
          <h2>System Status</h2>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-indicator online"></span>
              <span>Website</span>
              <span className="status-text">Online</span>
            </div>
            <div className="status-item">
              <span className="status-indicator online"></span>
              <span>Database</span>
              <span className="status-text">Online</span>
            </div>
            <div className="status-item">
              <span className="status-indicator online"></span>
              <span>Payment System</span>
              <span className="status-text">Online</span>
            </div>
            <div className="status-item">
              <span className="status-indicator online"></span>
              <span>Email Service</span>
              <span className="status-text">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage; 