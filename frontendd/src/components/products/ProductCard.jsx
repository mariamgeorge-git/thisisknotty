import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  Rating,
  Badge,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Visibility,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 12px 30px rgba(0,0,0,0.12)',
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 280,
  position: 'relative',
  '&:hover .product-overlay': {
    opacity: 1,
  },
}));

const ProductOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(156, 175, 136, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  opacity: 0,
  transition: 'opacity 0.3s ease',
}));

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onViewDetails }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <StyledCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      <ProductImage
        image={product.images?.[0] || '/placeholder-bag.jpg'}
        title={product.name}
      >
        <ProductOverlay className="product-overlay">
          <IconButton
            onClick={handleViewDetails}
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
            }}
          >
            <Visibility />
          </IconButton>
          <IconButton
            onClick={handleAddToWishlist}
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
            }}
          >
            {isWishlisted ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </ProductOverlay>
      </ProductImage>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 600,
            color: '#2C2C2C',
            mb: 1,
            fontSize: '1.1rem',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: 40 }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={product.color}
            size="small"
            sx={{
              backgroundColor: '#F5F1E8',
              color: '#2C2C2C',
              fontWeight: 500,
            }}
          />
          <Chip
            label={product.size}
            size="small"
            sx={{
              backgroundColor: '#F5F1E8',
              color: '#2C2C2C',
              fontWeight: 500,
            }}
          />
          <Chip
            label={product.shape}
            size="small"
            sx={{
              backgroundColor: '#F5F1E8',
              color: '#2C2C2C',
              fontWeight: 500,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            (24 reviews)
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#9CAF88',
              fontSize: '1.5rem',
            }}
          >
            {formatPrice(product.price)}
          </Typography>

          <Badge
            badgeContent={product.stock}
            color={product.stock > 0 ? 'success' : 'error'}
            sx={{ mr: 1 }}
          >
            <Typography variant="body2" color="text.secondary">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </Badge>
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          sx={{
            mt: 2,
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
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard; 