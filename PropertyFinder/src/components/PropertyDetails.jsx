import { useState } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  GitCompare, 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Calendar,
  Car,
  Wifi,
  Waves,
  Trees,
  Shield,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import ContactForm from './ContactForm';

const PropertyDetails = ({ 
  property, 
  onBack, 
  onAddToFavorites, 
  onAddToComparison, 
  isFavorite, 
  isInComparison 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const amenityIcons = {
    'Parking': Car,
    'WiFi': Wifi,
    'Pool': Waves,
    'Garden': Trees,
    'Security': Shield
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Properties</span>
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={onAddToFavorites}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
          </button>
          <button
            onClick={onAddToComparison}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isInComparison 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-green-50 hover:text-green-500'
            }`}
          >
            <GitCompare className="w-5 h-5" />
            <span>{isInComparison ? 'In Comparison' : 'Compare'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex overflow-x-auto p-4 space-x-4">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Listed on {new Date(property.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  ${property.price.toLocaleString()}
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {property.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bed className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Bath className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Square className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.sqft}</div>
                <div className="text-sm text-gray-600">Sq Ft</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg font-bold text-gray-600">{property.type}</span>
                </div>
                <div className="text-sm text-gray-600">Property Type</div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => {
                  const IconComponent = amenityIcons[amenity] || Shield;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Location & Neighborhood</h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive map would be here</p>
                <p className="text-sm text-gray-500 mt-1">{property.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Agent */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {property.agent?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{property.agent?.name || 'Property Agent'}</div>
                  <div className="text-sm text-gray-600">{property.agent?.title || 'Real Estate Agent'}</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="flex items-center space-x-3 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{property.agent?.phone || '(555) 123-4567'}</span>
                </button>
                <button className="flex items-center space-x-3 w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">{property.agent?.email || 'agent@propertyhub.com'}</span>
                </button>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center justify-center space-x-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Property Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property ID</span>
                <span className="font-medium">#{property.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-medium capitalize">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year Built</span>
                <span className="font-medium">{property.yearBuilt || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lot Size</span>
                <span className="font-medium">{property.lotSize || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm
          property={property}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetails;