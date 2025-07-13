import React, { useState, useEffect } from 'react';
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Pagination,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Search,
  FilterList,
  Clear,
  GridView,
  ViewList,
} from '@mui/icons-material';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';

const ProductList = ({ products, loading, error, onAddToCart, onAddToWishlist }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const productsPerPage = 12;

  // Get unique values for filters
  const colors = [...new Set(products.map(p => p.color))];
  const sizes = [...new Set(products.map(p => p.size))];
  const shapes = [...new Set(products.map(p => p.shape))];

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Color filter
    if (selectedColor) {
      filtered = filtered.filter(product => product.color === selectedColor);
    }

    // Size filter
    if (selectedSize) {
      filtered = filtered.filter(product => product.size === selectedSize);
    }

    // Shape filter
    if (selectedShape) {
      filtered = filtered.filter(product => product.shape === selectedShape);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    setPage(1); // Reset to first page when filters change
  }, [products, searchTerm, selectedColor, selectedSize, selectedShape, priceRange, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedShape('');
    setPriceRange([0, 1000]);
    setSortBy('name');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={280} />
              <Skeleton variant="text" sx={{ mt: 1 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">
          Error loading products: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Our Crochet Bags
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Discover our handcrafted collection of beautiful crochet bags in various colors, sizes, and shapes.
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search bags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              fullWidth
            >
              Filters
            </Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={viewMode === 'grid' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('grid')}
                startIcon={<GridView />}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'contained' : 'outlined'}
                onClick={() => setViewMode('list')}
                startIcon={<ViewList />}
              >
                List
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={1}>
            <Button
              variant="text"
              startIcon={<Clear />}
              onClick={handleClearFilters}
              disabled={!searchTerm && !selectedColor && !selectedSize && !selectedShape}
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters */}
        {(searchTerm || selectedColor || selectedSize || selectedShape) && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {searchTerm && (
              <Chip
                label={`Search: ${searchTerm}`}
                onDelete={() => setSearchTerm('')}
                color="primary"
              />
            )}
            {selectedColor && (
              <Chip
                label={`Color: ${selectedColor}`}
                onDelete={() => setSelectedColor('')}
                color="primary"
              />
            )}
            {selectedSize && (
              <Chip
                label={`Size: ${selectedSize}`}
                onDelete={() => setSelectedSize('')}
                color="primary"
              />
            )}
            {selectedShape && (
              <Chip
                label={`Shape: ${selectedShape}`}
                onDelete={() => setSelectedShape('')}
                color="primary"
              />
            )}
          </Box>
        )}
      </Box>

      {/* Filters Panel */}
      {showFilters && (
        <ProductFilter
          colors={colors}
          sizes={sizes}
          shapes={shapes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          selectedShape={selectedShape}
          priceRange={priceRange}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
          onShapeChange={setSelectedShape}
          onPriceRangeChange={setPriceRange}
          sx={{ mb: 4 }}
        />
      )}

      {/* Results Count */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredProducts.length} of {products.length} products
        </Typography>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
            />
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or filter criteria
          </Typography>
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductList; 