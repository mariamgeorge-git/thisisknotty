import React, { useContext } from 'react';
import { useCart } from '../contexts/CartContext';
import { AuthContext } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { items: cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any beautiful crochet bags to your cart yet!</p>
            <button 
              className="btn-primary"
              onClick={handleContinueShopping}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image || '/placeholder-product.jpg'} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = '/placeholder-product.jpg';
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price">${item.price}</div>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-amount">${(item.price * item.quantity).toFixed(2)}</span>
                </div>

                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-item">
              <span>Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
              <span>${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-item">
              <span>Tax</span>
              <span>${(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>${(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 1.08).toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <button 
                className="btn-primary checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="btn-secondary"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
              
              <button 
                className="btn-clear"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>

            <div className="cart-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <div>
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <span className="benefit-icon">🔄</span>
                <div>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <div>
                  <h4>Secure Checkout</h4>
                  <p>Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 