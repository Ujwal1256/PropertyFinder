import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetails from './components/PropertyDetails';
import FavoritesList from './components/FavoritesList';
import ComparisonTool from './components/ComparisonTool';
import { sampleProperties } from './data/sampleProperties';
import './index.css'

function App() {
  const [properties, setProperties] = useState(sampleProperties);
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [currentView, setCurrentView] = useState('home'); 
  const [viewMode, setViewMode] = useState('grid'); 
  const [sortBy, setSortBy] = useState('newest');
  const [searchFilters, setSearchFilters] = useState({
    search: '',
    priceRange: [0, 2000000],
    propertyType: '',
    bedrooms: '',
    location: ''
  });

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = [...properties];

    if (searchFilters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchFilters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(searchFilters.search.toLowerCase()) ||
        property.description.toLowerCase().includes(searchFilters.search.toLowerCase())
      );
    }

    if (searchFilters.propertyType) {
      filtered = filtered.filter(property => property.type === searchFilters.propertyType);
    }

    if (searchFilters.bedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(searchFilters.bedrooms));
    }

    if (searchFilters.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    filtered = filtered.filter(property =>
      property.price >= searchFilters.priceRange[0] && property.price <= searchFilters.priceRange[1]
    );

    // Sort filtered results
    switch (sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  }, [properties, searchFilters, sortBy]);

  const addToFavorites = (property) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === property.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== property.id);
      }
      return [...prev, property];
    });
  };

  const addToComparison = (property) => {
    setComparison(prev => {
      const isAlreadyInComparison = prev.some(comp => comp.id === property.id);
      if (isAlreadyInComparison) {
        return prev.filter(comp => comp.id !== property.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), property];
      }
      return [...prev, property];
    });
  };

  const viewProperty = (property) => {
    setSelectedProperty(property);
    setCurrentView('property');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'property':
        return (
          <PropertyDetails
            property={selectedProperty}
            onBack={() => setCurrentView('home')}
            onAddToFavorites={addToFavorites}
            onAddToComparison={addToComparison}
            isFavorite={favorites.some(fav => fav.id === selectedProperty?.id)}
            isInComparison={comparison.some(comp => comp.id === selectedProperty?.id)}
          />
        );
      case 'favorites':
        return (
          <FavoritesList
            favorites={favorites}
            onViewProperty={viewProperty}
            onRemoveFromFavorites={addToFavorites}
            onBack={() => setCurrentView('home')}
          />
        );
      case 'comparison':
        return (
          <ComparisonTool
            properties={comparison}
            onRemoveFromComparison={addToComparison}
            onViewProperty={viewProperty}
            onBack={() => setCurrentView('home')}
          />
        );
      default:
        return (
          <>
            <SearchFilters
              filters={searchFilters}
              onFiltersChange={setSearchFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultsCount={filteredProperties.length}
            />
            <PropertyGrid
              properties={filteredProperties}
              onViewProperty={viewProperty}
              onAddToFavorites={addToFavorites}
              onAddToComparison={addToComparison}
              favorites={favorites}
              comparison={comparison}
              viewMode={viewMode}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        favoritesCount={favorites.length}
        comparisonCount={comparison.length}
      />
      <main className="container mx-auto px-4 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;