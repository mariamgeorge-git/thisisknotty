import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './AdminUsersPage.css';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAPI.getAllUsers(filters);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await userAPI.updateUserRole(userId, newRole);
      fetchUsers(); // Refresh the list
      setShowUpdateModal(false);
      setSelectedUser(null);
    } catch (err) {
      alert('Failed to update user role: ' + err.message);
    }
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      await userAPI.updateUserStatus(userId, newStatus);
      fetchUsers(); // Refresh the list
    } catch (err) {
      alert('Failed to update user status: ' + err.message);
    }
  };

  const handleUserDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userAPI.deleteUser(userId);
        fetchUsers(); // Refresh the list
      } catch (err) {
        alert('Failed to delete user: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'active' : 'inactive';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'admin';
      case 'customer':
        return 'customer';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="users-container">
          <div className="loading-spinner">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-page">
        <div className="users-container">
          <div className="error-message">
            <h2>Error Loading Users</h2>
            <p>{error}</p>
            <button onClick={fetchUsers}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="users-container">
        <div className="users-header">
          <div className="header-content">
            <h1>Manage Users</h1>
            <p>View and manage user accounts</p>
          </div>
          <div className="users-stats">
            <div className="stat">
              <span className="stat-number">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {users.filter(user => user.role === 'admin').length}
              </span>
              <span className="stat-label">Admins</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {users.filter(user => user.role === 'customer').length}
              </span>
              <span className="stat-label">Customers</span>
            </div>
          </div>
        </div>

        <div className="users-filters">
          <div className="filter-group">
            <label htmlFor="role-filter">Role:</label>
            <select
              id="role-filter"
              value={filters.role}
              onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="search-filter">Search:</label>
            <input
              type="text"
              id="search-filter"
              placeholder="Name, email..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>

        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Orders</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-users">
                    <div className="no-users-content">
                      <div className="no-users-icon">👥</div>
                      <h3>No Users Found</h3>
                      <p>No users match your current filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                        <div className="user-details">
                          <span className="user-name">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="user-id">ID: {user._id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="user-email">{user.email}</span>
                    </td>
                    <td>
                      <span className={`role ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className="join-date">{formatDate(user.createdAt)}</span>
                    </td>
                    <td>
                      <span className="orders-count">{user.orderCount || 0}</span>
                    </td>
                    <td>
                      <div className="user-actions">
                        <button 
                          className="btn-secondary edit-role"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUpdateModal(true);
                          }}
                        >
                          Edit Role
                        </button>
                        
                        <button 
                          className={`btn-secondary toggle-status ${user.status === 'active' ? 'deactivate' : 'activate'}`}
                          onClick={() => handleUserStatusToggle(user._id, user.status)}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        
                        <button 
                          className="btn-danger delete-user"
                          onClick={() => handleUserDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Role Modal */}
      {showUpdateModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Update User Role</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedUser(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                Update role for <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>
              </p>
              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    defaultChecked={selectedUser.role === 'customer'}
                  />
                  Customer
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    defaultChecked={selectedUser.role === 'admin'}
                  />
                  Admin
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => {
                  setShowUpdateModal(false);
                  setSelectedUser(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  const newRole = document.querySelector('input[name="role"]:checked').value;
                  handleRoleUpdate(selectedUser._id, newRole);
                }}
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage; 