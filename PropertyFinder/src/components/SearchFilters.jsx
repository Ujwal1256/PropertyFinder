import { useState } from 'react';
import { Search, Filter, Grid3x3 as Grid3X3, List, SlidersHorizontal, ChevronDown } from 'lucide-react';

const SearchFilters = ({ 
  filters, 
  onFiltersChange, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange, 
  resultsCount 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);

  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(value);
    setLocalPriceRange(newRange);
    onFiltersChange({ ...filters, priceRange: newRange });
  };

  const clearFilters = () => {
    const defaultFilters = {
      search: '',
      priceRange: [0, 2000000],
      propertyType: '',
      bedrooms: '',
      location: ''
    };
    setLocalPriceRange([0, 2000000]);
    onFiltersChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location, property name, or description..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilter('propertyType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="villa">Villa</option>
            </select>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
            <select
              value={filters.bedrooms}
              onChange={(e) => updateFilter('bedrooms', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              placeholder="City or neighborhood"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Price Range */}
          <div className="md:col-span-2 lg:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={localPriceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>${localPriceRange[0].toLocaleString()}</span>
                <span>-</span>
                <span>${localPriceRange[1].toLocaleString()}</span>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="50000"
                  value={localPriceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary and View Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600">
          <span className="font-semibold text-gray-900">{resultsCount}</span> properties found
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;