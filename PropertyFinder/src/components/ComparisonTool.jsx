import { ArrowLeft, X, Bed, Bath, Square, MapPin, DollarSign, Home } from 'lucide-react';

const ComparisonTool = ({ properties, onRemoveFromComparison, onViewProperty, onBack }) => {
  if (properties.length === 0) {
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
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No properties to compare</h3>
          <p className="text-gray-500 mb-6">Add properties to comparison to see them side by side!</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Property Comparison</h1>
            <p className="text-gray-600">Compare up to 3 properties side by side</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-600 w-48">Feature</th>
                {properties.map((property) => (
                  <th key={property.id} className="text-center p-4 min-w-80">
                    <div className="relative">
                      <button
                        onClick={() => onRemoveFromComparison(property)}
                        className="absolute top-0 right-0 p-1 bg-gray-200 hover:bg-red-100 rounded-full transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{property.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                      <button
                        onClick={() => onViewProperty(property)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-600">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Price</span>
                  </div>
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center">
                    <span className="text-xl font-bold text-blue-600">
                      ${property.price.toLocaleString()}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Property Type */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="p-4 font-medium text-gray-600">Property Type</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center capitalize">
                    {property.type}
                  </td>
                ))}
              </tr>

              {/* Bedrooms */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4" />
                    <span>Bedrooms</span>
                  </div>
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center font-semibold">
                    {property.bedrooms}
                  </td>
                ))}
              </tr>

              {/* Bathrooms */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="p-4 font-medium text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Bath className="w-4 h-4" />
                    <span>Bathrooms</span>
                  </div>
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center font-semibold">
                    {property.bathrooms}
                  </td>
                ))}
              </tr>

              {/* Square Feet */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Square className="w-4 h-4" />
                    <span>Square Feet</span>
                  </div>
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center font-semibold">
                    {property.sqft}
                  </td>
                ))}
              </tr>

              {/* Status */}
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="p-4 font-medium text-gray-600">Status</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center">
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {property.status}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr className="border-b border-gray-100">
                <td className="p-4 font-medium text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                </td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center text-sm">
                    {property.location}
                  </td>
                ))}
              </tr>

              {/* Date Added */}
              <tr className="bg-gray-50">
                <td className="p-4 font-medium text-gray-600">Date Listed</td>
                {properties.map((property) => (
                  <td key={property.id} className="p-4 text-center text-sm">
                    {new Date(property.dateAdded).toLocaleDateString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {properties.length < 3 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-center">
            You can compare up to 3 properties. Add more properties from the main listing to compare.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;