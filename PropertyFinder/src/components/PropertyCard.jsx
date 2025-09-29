import { Heart, GitCompare, Bed, Bath, Square, MapPin, Calendar } from 'lucide-react';

const PropertyCard = ({ 
  property, 
  onView, 
  onAddToFavorites, 
  onAddToComparison, 
  isFavorite, 
  isInComparison, 
  viewMode 
}) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 md:h-full object-cover cursor-pointer"
              onClick={onView}
            />
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={onAddToFavorites}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                }`}
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={onAddToComparison}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isInComparison 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500'
                }`}
              >
                <GitCompare className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.status}
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={onView}
              >
                {property.title}
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                ${property.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-gray-500">
                <div className="flex items-center space-x-1">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Bath className="w-4 h-4" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Square className="w-4 h-4" />
                  <span className="text-sm">{property.sqft}</span>
                </div>
              </div>
              <button
                onClick={onView}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={onView}
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={onAddToFavorites}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
            }`}
          >
            <Heart className="w-4 h-4" />
          </button>
          <button
            onClick={onAddToComparison}
            className={`p-2 rounded-full shadow-md transition-all duration-200 ${
              isInComparison 
                ? 'bg-green-500 text-white scale-110' 
                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-500 hover:scale-110'
            }`}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {property.status}
        </div>
      </div>
      
      <div className="p-6">
        <h3 
          className="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={onView}
        >
          {property.title}
        </h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-gray-500">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4" />
              <span className="text-sm">{property.sqft}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </span>
          <button
            onClick={onView}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
        
        <div className="flex items-center mt-3 text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Added {new Date(property.dateAdded).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;