import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const [analytics] = useState({
    totalSales: 15420.50,
    totalOrders: 342,
    totalProducts: 45,
    totalCustomers: 128,
    recentOrders: [
      { id: 'TIK12345678', customer: 'Jane Doe', amount: 98.97, status: 'Processing', date: '2024-01-15' },
      { id: 'TIK12345679', customer: 'John Smith', amount: 45.99, status: 'Delivered', date: '2024-01-14' },
      { id: 'TIK12345680', customer: 'Sarah Wilson', amount: 156.98, status: 'Shipped', date: '2024-01-13' },
      { id: 'TIK12345681', customer: 'Mike Johnson', amount: 67.50, status: 'Processing', date: '2024-01-12' }
    ],
    topProducts: [
      { name: 'Cozy Crochet Tote', sales: 45, revenue: 2070.55 },
      { name: 'Boho Market Bag', sales: 38, revenue: 2013.62 },
      { name: 'Elegant Evening Clutch', sales: 32, revenue: 1536.00 },
      { name: 'Weekend Travel Bag', sales: 28, revenue: 1400.00 }
    ]
  });

  const [orders] = useState([
    { id: 'TIK12345678', customer: 'Jane Doe', email: 'jane@example.com', amount: 98.97, status: 'Processing', date: '2024-01-15', items: 2 },
    { id: 'TIK12345679', customer: 'John Smith', email: 'john@example.com', amount: 45.99, status: 'Delivered', date: '2024-01-14', items: 1 },
    { id: 'TIK12345680', customer: 'Sarah Wilson', email: 'sarah@example.com', amount: 156.98, status: 'Shipped', date: '2024-01-13', items: 3 },
    { id: 'TIK12345681', customer: 'Mike Johnson', email: 'mike@example.com', amount: 67.50, status: 'Processing', date: '2024-01-12', items: 1 },
    { id: 'TIK12345682', customer: 'Emily Brown', email: 'emily@example.com', amount: 89.99, status: 'Pending', date: '2024-01-11', items: 2 }
  ]);

  const [products] = useState([
    { id: 1, name: 'Cozy Crochet Tote', price: 45.99, stock: 15, category: 'Totes', status: 'Active' },
    { id: 2, name: 'Boho Market Bag', price: 52.99, stock: 8, category: 'Market Bags', status: 'Active' },
    { id: 3, name: 'Elegant Evening Clutch', price: 48.00, stock: 22, category: 'Clutches', status: 'Active' },
    { id: 4, name: 'Weekend Travel Bag', price: 50.00, stock: 5, category: 'Travel Bags', status: 'Low Stock' },
    { id: 5, name: 'Mini Crossbody Bag', price: 35.99, stock: 0, category: 'Crossbody', status: 'Out of Stock' }
  ]);

  const [customers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane@example.com', orders: 5, totalSpent: 245.50, joinDate: '2023-12-01', status: 'Active' },
    { id: 2, name: 'John Smith', email: 'john@example.com', orders: 3, totalSpent: 156.98, joinDate: '2023-12-15', status: 'Active' },
    { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', orders: 7, totalSpent: 389.75, joinDate: '2023-11-20', status: 'Active' },
    { id: 4, name: 'Mike Johnson', email: 'mike@example.com', orders: 2, totalSpent: 67.50, joinDate: '2024-01-05', status: 'Active' },
    { id: 5, name: 'Emily Brown', email: 'emily@example.com', orders: 1, totalSpent: 89.99, joinDate: '2024-01-10', status: 'Active' }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#27ae60';
      case 'Shipped': return '#3498db';
      case 'Processing': return '#f39c12';
      case 'Pending': return '#e74c3c';
      case 'Active': return '#27ae60';
      case 'Low Stock': return '#f39c12';
      case 'Out of Stock': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's what's happening with ThisIsKnotty today.</p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <nav className="dashboard-nav">
              <button
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Overview
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
                Orders
              </button>
              
              <button
                className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Products
              </button>
              
              <button
                className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
                onClick={() => setActiveTab('customers')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Customers
              </button>
              
              <button
                className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => setActiveTab('analytics')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
                Analytics
              </button>
            </nav>
          </div>

          <div className="dashboard-main">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="dashboard-section">
                <h2>Dashboard Overview</h2>
                
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon sales">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <h3>Total Sales</h3>
                      <p className="stat-value">${analytics.totalSales.toFixed(2)}</p>
                      <span className="stat-change positive">+12.5% from last month</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon orders">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <h3>Total Orders</h3>
                      <p className="stat-value">{analytics.totalOrders}</p>
                      <span className="stat-change positive">+8.2% from last month</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon products">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <h3>Products</h3>
                      <p className="stat-value">{analytics.totalProducts}</p>
                      <span className="stat-change neutral">No change</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon customers">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <h3>Customers</h3>
                      <p className="stat-value">{analytics.totalCustomers}</p>
                      <span className="stat-change positive">+15.3% from last month</span>
                    </div>
                  </div>
                </div>

                <div className="overview-grid">
                  <div className="recent-orders">
                    <h3>Recent Orders</h3>
                    <div className="orders-list">
                      {analytics.recentOrders.map((order) => (
                        <div key={order.id} className="order-item">
                          <div className="order-info">
                            <h4>#{order.id}</h4>
                            <p>{order.customer}</p>
                            <span className="order-date">{formatDate(order.date)}</span>
                          </div>
                          <div className="order-details">
                            <span className="order-amount">${order.amount.toFixed(2)}</span>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="top-products">
                    <h3>Top Products</h3>
                    <div className="products-list">
                      {analytics.topProducts.map((product, index) => (
                        <div key={index} className="product-item">
                          <div className="product-rank">#{index + 1}</div>
                          <div className="product-info">
                            <h4>{product.name}</h4>
                            <p>{product.sales} sales</p>
                          </div>
                          <div className="product-revenue">
                            ${product.revenue.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Order Management</h2>
                  <button className="btn-primary">Export Orders</button>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.customer}</td>
                          <td>{order.email}</td>
                          <td>${order.amount.toFixed(2)}</td>
                          <td>{order.items}</td>
                          <td>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>{formatDate(order.date)}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-secondary">View</button>
                              <button className="btn-secondary">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Product Management</h2>
                  <button className="btn-primary">Add New Product</button>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>#{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.stock}</td>
                          <td>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(product.status) }}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-secondary">Edit</button>
                              <button className="btn-secondary">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Customers Tab */}
            {activeTab === 'customers' && (
              <div className="dashboard-section">
                <div className="section-header">
                  <h2>Customer Management</h2>
                  <button className="btn-primary">Export Customers</button>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Total Spent</th>
                        <th>Join Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer.id}>
                          <td>#{customer.id}</td>
                          <td>{customer.name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.orders}</td>
                          <td>${customer.totalSpent.toFixed(2)}</td>
                          <td>{formatDate(customer.joinDate)}</td>
                          <td>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(customer.status) }}
                            >
                              {customer.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-secondary">View</button>
                              <button className="btn-secondary">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="dashboard-section">
                <h2>Analytics & Reports</h2>
                
                <div className="analytics-grid">
                  <div className="chart-card">
                    <h3>Sales Overview</h3>
                    <div className="chart-placeholder">
                      <p>Sales chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="chart-card">
                    <h3>Top Products</h3>
                    <div className="chart-placeholder">
                      <p>Product performance chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="chart-card">
                    <h3>Customer Growth</h3>
                    <div className="chart-placeholder">
                      <p>Customer growth chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="chart-card">
                    <h3>Revenue by Category</h3>
                    <div className="chart-placeholder">
                      <p>Category revenue chart will be displayed here</p>
                    </div>
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

export default AdminDashboard; 