import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Chip,
  Rating,
  Divider,
  TextField,
  IconButton,
  Card,
  CardMedia,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Security,
  Refresh,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import axios from 'axios';

const StyledSwiper = styled(Swiper)(({ theme }) => ({
  '& .swiper-slide': {
    textAlign: 'center',
    fontSize: 18,
    background: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .swiper-slide img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const ThumbnailSwiper = styled(Swiper)(({ theme }) => ({
  '& .swiper-slide': {
    opacity: 0.4,
    cursor: 'pointer',
    transition: 'opacity 0.3s ease',
  },
  '& .swiper-slide-thumb-active': {
    opacity: 1,
  },
}));

const ProductDetails = ({ product, onAddToCart, onAddToWishlist, loading, error }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [canReview, setCanReview] = useState(false); // Assume false, set true if verified buyer
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  useEffect(() => {
    if (product && product._id) {
      fetchReviews();
      fetchAvgRating();
      checkVerifiedBuyer();
    }
    // eslint-disable-next-line
  }, [product]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      setReviews([]);
    }
  };

  const fetchAvgRating = async () => {
    try {
      const res = await axios.get(`/api/products/${product._id}/reviews/average`);
      setAvgRating(res.data.avgRating || 0);
      setReviewCount(res.data.count || 0);
    } catch (err) {
      setAvgRating(0);
      setReviewCount(0);
    }
  };

  // Dummy check for verified buyer (replace with real API call)
  const checkVerifiedBuyer = async () => {
    // TODO: Replace with real backend check
    setCanReview(true); // For now, allow all users
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateTotal = () => {
    return product.price * quantity;
  };

  const handlePhotoChange = (e) => {
    setReviewPhotos([...e.target.files]);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    try {
      // For now, just send text, rating, and photo names (no upload logic)
      await axios.post(`/api/products/${product._id}/reviews`, {
        rating: reviewRating,
        comment: reviewText,
        photos: reviewPhotos.map(f => f.name),
      });
      setReviewSuccess('Review submitted!');
      setReviewText('');
      setReviewRating(0);
      setReviewPhotos([]);
      fetchReviews();
      fetchAvgRating();
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 400, backgroundColor: '#F5F1E8' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 200, backgroundColor: '#F5F1E8', mb: 2 }} />
            <Box sx={{ height: 100, backgroundColor: '#F5F1E8', mb: 2 }} />
            <Box sx={{ height: 50, backgroundColor: '#F5F1E8' }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading product: {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Product not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <StyledSwiper
              spaceBetween={10}
              navigation={true}
              pagination={{ clickable: true }}
              thumbs={{ swiper: null }}
              modules={[Navigation, Pagination, Thumbs]}
              style={{ height: 400 }}
            >
              {product.images && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="/placeholder-bag.jpg"
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </SwiperSlide>
              )}
            </StyledSwiper>
          </Box>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <ThumbnailSwiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    style={{ width: '100%', height: 80, objectFit: 'cover' }}
                  />
                </SwiperSlide>
              ))}
            </ThumbnailSwiper>
          )}
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2, color: '#2C2C2C' }}>
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={avgRating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>{avgRating.toFixed(1)} ({reviewCount} reviews)</Typography>
          </Box>

          {/* Price */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: '#9CAF88',
              mb: 3,
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          {/* Product Tags */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
            <Chip
              label={product.color}
              size="medium"
              sx={{
                backgroundColor: '#F5F1E8',
                color: '#2C2C2C',
                fontWeight: 500,
              }}
            />
            <Chip
              label={product.size}
              size="medium"
              sx={{
                backgroundColor: '#F5F1E8',
                color: '#2C2C2C',
                fontWeight: 500,
              }}
            />
            <Chip
              label={product.shape}
              size="medium"
              sx={{
                backgroundColor: '#F5F1E8',
                color: '#2C2C2C',
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Stock Status */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body1"
              color={product.stock > 0 ? 'success.main' : 'error.main'}
              sx={{ fontWeight: 500 }}
            >
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </Typography>
          </Box>

          {/* Quantity Selector */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Quantity
            </Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1, max: product.stock }}
              sx={{ width: 120 }}
              disabled={product.stock === 0}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              sx={{
                flex: 1,
                backgroundColor: '#9CAF88',
                '&:hover': {
                  backgroundColor: '#7A8F6A',
                },
                '&:disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#999',
                },
              }}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <IconButton
              onClick={handleAddToWishlist}
              sx={{
                border: '2px solid #9CAF88',
                color: isWishlisted ? '#9CAF88' : '#9CAF88',
                '&:hover': {
                  backgroundColor: 'rgba(156, 175, 136, 0.1)',
                },
              }}
            >
              {isWishlisted ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              sx={{
                border: '2px solid #9CAF88',
                color: '#9CAF88',
                '&:hover': {
                  backgroundColor: 'rgba(156, 175, 136, 0.1)',
                },
              }}
            >
              <Share />
            </IconButton>
          </Box>

          {/* Total Price */}
          {quantity > 1 && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#F5F1E8', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Total: {formatPrice(calculateTotal())}
              </Typography>
            </Box>
          )}

          {/* Product Features */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Product Features
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping sx={{ color: '#9CAF88' }} />
                  <Typography variant="body2">Free Shipping</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security sx={{ color: '#9CAF88' }} />
                  <Typography variant="body2">Secure Payment</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Refresh sx={{ color: '#9CAF88' }} />
                  <Typography variant="body2">Easy Returns</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#9CAF88' }} />
                  <Typography variant="body2">Handmade Quality</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Product Details Tabs */}
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              color: '#666666',
              '&.Mui-selected': {
                color: '#9CAF88',
              },
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {activeTab === 0 && (
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>
          )}

          {activeTab === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<Refresh />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Product Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography><strong>Color:</strong> {product.color}</Typography>
                      <Typography><strong>Size:</strong> {product.size}</Typography>
                      <Typography><strong>Shape:</strong> {product.shape}</Typography>
                      <Typography><strong>Material:</strong> 100% Cotton Yarn</Typography>
                      <Typography><strong>Care:</strong> Hand wash cold</Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Accordion>
                  <AccordionSummary expandIcon={<Refresh />}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Shipping & Returns
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography><strong>Shipping:</strong> 3-5 business days</Typography>
                      <Typography><strong>Returns:</strong> 30 days</Typography>
                      <Typography><strong>Warranty:</strong> 1 year</Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Customer Reviews
              </Typography>
              {reviews.length === 0 && <Typography>No reviews yet.</Typography>}
              {reviews.map((review, idx) => (
                <Card key={idx} sx={{ mb: 2, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>{review.userId?.firstName} {review.userId?.lastName}</Typography>
                    {review.isVerifiedBuyer && <Chip label="Verified Buyer" color="success" size="small" sx={{ ml: 2 }} />}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>{review.comment}</Typography>
                  {review.photos && review.photos.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                      {review.photos.map((photo, i) => (
                        <CardMedia
                          key={i}
                          component="img"
                          image={photo}
                          alt={`Review photo ${i + 1}`}
                          sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2 }}
                        />
                      ))}
                    </Box>
                  )}
                  <Typography variant="caption" color="text.secondary">{new Date(review.createdAt).toLocaleDateString()}</Typography>
                </Card>
              ))}

              {/* Review Form */}
              {canReview && (
                <Box component="form" onSubmit={handleReviewSubmit} sx={{ mt: 4, p: 3, border: '1px solid #eee', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Write a Review</Typography>
                  <Rating
                    value={reviewRating}
                    onChange={(_, newValue) => setReviewRating(newValue)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Your review"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    required
                  />
                  <Button variant="contained" component="label" sx={{ mb: 2 }}>
                    Upload Photos
                    <input type="file" hidden multiple accept="image/*" onChange={handlePhotoChange} />
                  </Button>
                  {reviewPhotos.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {Array.from(reviewPhotos).map((file, i) => (
                        <Typography key={i} variant="caption">{file.name}</Typography>
                      ))}
                    </Box>
                  )}
                  {reviewError && <Alert severity="error" sx={{ mb: 2 }}>{reviewError}</Alert>}
                  {reviewSuccess && <Alert severity="success" sx={{ mb: 2 }}>{reviewSuccess}</Alert>}
                  <Button type="submit" variant="contained" color="primary">Submit Review</Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetails; 