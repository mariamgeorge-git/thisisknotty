import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import './EditProductPage.css';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    material: '',
    dimensions: '',
    careInstructions: '',
    inStock: true,
    stockQuantity: '',
    sku: '',
    images: [],
    tags: []
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'Tote Bags',
    'Market Bags',
    'Handbags',
    'Beach Bags',
    'Crossbody Bags',
    'Clutches'
  ];

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const product = await productAPI.getProductById(productId);
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category || '',
        material: product.material || '',
        dimensions: product.dimensions || '',
        careInstructions: product.careInstructions || '',
        inStock: product.inStock ?? true,
        stockQuantity: product.stockQuantity?.toString() || '',
        sku: product.sku || '',
        images: product.images || [],
        tags: product.tags || []
      });
    } catch (err) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      // Upload new images first
      const uploadedImages = [];
      for (const image of formData.images) {
        if (image instanceof File) {
          const imageUrl = await productAPI.uploadProductImage(image);
          uploadedImages.push(imageUrl.url);
        } else {
          uploadedImages.push(image);
        }
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stockQuantity: parseInt(formData.stockQuantity),
        images: uploadedImages
      };

      await productAPI.updateProduct(productId, productData);
      navigate('/admin/products');
      
    } catch (err) {
      setError(err.message || 'Failed to update product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-product-page">
        <div className="edit-product-container">
          <div className="loading-spinner">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-product-page">
        <div className="edit-product-container">
          <div className="error-message">
            <h2>Error Loading Product</h2>
            <p>{error}</p>
            <button onClick={fetchProduct}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-product-page">
      <div className="edit-product-container">
        <div className="page-header">
          <h1>Edit Product</h1>
          <p>Update the details of your crochet bag</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-sections">
            {/* Basic Information */}
            <div className="form-section">
              <h2>Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your crochet bag..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="sku">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="Stock Keeping Unit"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="form-section">
              <h2>Pricing</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="originalPrice">Original Price</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="For sale items"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="form-section">
              <h2>Product Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="material">Material</label>
                  <input
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    placeholder="e.g., Premium Cotton Yarn"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dimensions">Dimensions</label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g., 12&quot; x 14&quot; x 4&quot;"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="careInstructions">Care Instructions</label>
                <textarea
                  id="careInstructions"
                  name="careInstructions"
                  value={formData.careInstructions}
                  onChange={handleChange}
                  rows="3"
                  placeholder="How to care for this product..."
                />
              </div>
            </div>

            {/* Inventory */}
            <div className="form-section">
              <h2>Inventory</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stockQuantity">Stock Quantity *</label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                    In Stock
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="form-section">
              <h2>Product Images</h2>
              
              <div className="form-group">
                <label htmlFor="images">Add More Images</label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <p className="help-text">Upload additional high-quality images</p>
              </div>

              {formData.images.length > 0 && (
                <div className="image-preview">
                  <h3>Current Images</h3>
                  <div className="image-grid">
                    {formData.images.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={image instanceof File ? URL.createObjectURL(image) : image}
                          alt={`Product ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="remove-image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="form-section">
              <h2>Tags</h2>
              
              <div className="form-group">
                <label htmlFor="newTag">Add Tags</label>
                <div className="tag-input">
                  <input
                    type="text"
                    id="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Enter a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button type="button" onClick={addTag} className="add-tag-btn">
                    Add
                  </button>
                </div>
              </div>

              {formData.tags.length > 0 && (
                <div className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="remove-tag"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage; 