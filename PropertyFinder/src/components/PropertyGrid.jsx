import PropertyCard from './PropertyCard';

const PropertyGrid = ({ 
  properties, 
  onViewProperty, 
  onAddToFavorites, 
  onAddToComparison, 
  favorites, 
  comparison, 
  viewMode 
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    : 'space-y-6';

  return (
    <div className={gridClasses}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onView={() => onViewProperty(property)}
          onAddToFavorites={() => onAddToFavorites(property)}
          onAddToComparison={() => onAddToComparison(property)}
          isFavorite={favorites.some(fav => fav.id === property.id)}
          isInComparison={comparison.some(comp => comp.id === property.id)}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;