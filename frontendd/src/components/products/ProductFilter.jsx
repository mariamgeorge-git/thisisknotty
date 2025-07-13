import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  ExpandMore,
  Palette,
  Straighten,
  CropSquare,
  AttachMoney,
} from '@mui/icons-material';

const ProductFilter = ({
  colors,
  sizes,
  shapes,
  selectedColor,
  selectedSize,
  selectedShape,
  priceRange,
  onColorChange,
  onSizeChange,
  onShapeChange,
  onPriceRangeChange,
  sx = {},
}) => {
  const handlePriceChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FDFBF7',
        borderRadius: 2,
        p: 3,
        border: '1px solid #E0E0E0',
        ...sx,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#2C2C2C' }}>
        Filter Products
      </Typography>

      {/* Color Filter */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Palette sx={{ color: '#9CAF88' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Color
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <InputLabel>Select Color</InputLabel>
            <Select
              value={selectedColor}
              label="Select Color"
              onChange={(e) => onColorChange(e.target.value)}
            >
              <MenuItem value="">All Colors</MenuItem>
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: color.toLowerCase(),
                        border: '1px solid #E0E0E0',
                      }}
                    />
                    {color}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Size Filter */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Straighten sx={{ color: '#9CAF88' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Size
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <InputLabel>Select Size</InputLabel>
            <Select
              value={selectedSize}
              label="Select Size"
              onChange={(e) => onSizeChange(e.target.value)}
            >
              <MenuItem value="">All Sizes</MenuItem>
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Shape Filter */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none', mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CropSquare sx={{ color: '#9CAF88' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Shape
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <InputLabel>Select Shape</InputLabel>
            <Select
              value={selectedShape}
              label="Select Shape"
              onChange={(e) => onShapeChange(e.target.value)}
            >
              <MenuItem value="">All Shapes</MenuItem>
              {shapes.map((shape) => (
                <MenuItem key={shape} value={shape}>
                  {shape}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />

      {/* Price Range Filter */}
      <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney sx={{ color: '#9CAF88' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Price Range
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              sx={{
                '& .MuiSlider-thumb': {
                  backgroundColor: '#9CAF88',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#9CAF88',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#E0E0E0',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                $0
              </Typography>
              <Typography variant="caption" color="text.secondary">
                $1000
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Active Filters Summary */}
      {(selectedColor || selectedSize || selectedShape || priceRange[0] > 0 || priceRange[1] < 1000) && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {selectedColor && (
              <Chip
                label={`Color: ${selectedColor}`}
                size="small"
                onDelete={() => onColorChange('')}
                sx={{
                  backgroundColor: '#F5F1E8',
                  color: '#2C2C2C',
                }}
              />
            )}
            {selectedSize && (
              <Chip
                label={`Size: ${selectedSize}`}
                size="small"
                onDelete={() => onSizeChange('')}
                sx={{
                  backgroundColor: '#F5F1E8',
                  color: '#2C2C2C',
                }}
              />
            )}
            {selectedShape && (
              <Chip
                label={`Shape: ${selectedShape}`}
                size="small"
                onDelete={() => onShapeChange('')}
                sx={{
                  backgroundColor: '#F5F1E8',
                  color: '#2C2C2C',
                }}
              />
            )}
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <Chip
                label={`Price: $${priceRange[0]} - $${priceRange[1]}`}
                size="small"
                onDelete={() => onPriceRangeChange([0, 1000])}
                sx={{
                  backgroundColor: '#F5F1E8',
                  color: '#2C2C2C',
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductFilter; 