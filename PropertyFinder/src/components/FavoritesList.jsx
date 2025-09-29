import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import PropertyCard from './PropertyCard';

const FavoritesList = ({ favorites, onViewProperty, onRemoveFromFavorites, onBack }) => {
  if (favorites.length === 0) {
    return (
      <div>
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </button>
        </div>
        
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No favorite properties yet</h3>
          <p className="text-gray-500 mb-6">Start browsing properties and add them to your favorites!</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Properties</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Favorite Properties</h1>
            <p className="text-gray-600">{favorites.length} favorite{favorites.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
          <div key={property.id} className="relative">
            <PropertyCard
              property={property}
              onView={() => onViewProperty(property)}
              onAddToFavorites={() => onRemoveFromFavorites(property)}
              onAddToComparison={() => {}}
              isFavorite={true}
              isInComparison={false}
              viewMode="grid"
            />
            <button
              onClick={() => onRemoveFromFavorites(property)}
              className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors z-10"
              title="Remove from favorites"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;