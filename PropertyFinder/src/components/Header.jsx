import { useState } from 'react';
import { Heart, GitCompare, Menu, X, Home, Building2 } from 'lucide-react';

const Header = ({ currentView, onViewChange, favoritesCount, comparisonCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <Building2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">PropertyHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Properties</span>
            </button>
            <button
              onClick={() => onViewChange('favorites')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                currentView === 'favorites' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:text-red-600'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onViewChange('comparison')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors relative ${
                currentView === 'comparison' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:text-green-600'
              }`}
            >
              <GitCompare className="w-5 h-5" />
              <span>Compare</span>
              {comparisonCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onViewChange('home');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                  currentView === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Properties</span>
              </button>
              <button
                onClick={() => {
                  onViewChange('favorites');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors relative ${
                  currentView === 'favorites' ? 'bg-red-100 text-red-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  onViewChange('comparison');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors relative ${
                  currentView === 'comparison' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <GitCompare className="w-5 h-5" />
                <span>Compare</span>
                {comparisonCount > 0 && (
                  <span className="ml-auto bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {comparisonCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;