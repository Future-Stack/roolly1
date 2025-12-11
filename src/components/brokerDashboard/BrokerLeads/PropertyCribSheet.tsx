import React from 'react';
import { X, FileText, Eye, ExternalLink } from 'lucide-react';

interface Property {
  id: string;
  name: string;
  type: string;
  transaction: string;
  location: string;
  size: string;
  price: string;
}

interface PropertyCribSheetProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PropertyCribSheet: React.FC<PropertyCribSheetProps> = ({ 
  isOpen = true, 
  onClose 
}) => {
  const properties: Property[] = [
    {
      id: '1',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Industrial',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '2',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'sell',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '3',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '4',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    },
    {
      id: '5',
      name: 'PR001 - Leeds Industrial Park',
      type: 'Land',
      transaction: 'Rent',
      location: 'Manchester City Centre',
      size: '1000 sq',
      price: '$5000-$7000'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-[1000px] w-full max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-gray-200">
          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-blue-600 mt-1" strokeWidth={2} />
            <div>
              <h2 className="text-[20px] font-semibold text-gray-900 mb-1">
                Property Crib Sheet
              </h2>
              <p className="text-[13px] text-gray-600">
                Quick reference guide for all available properties with pricing details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-semibold text-gray-900">
                Available Properties
              </h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[12px] font-semibold rounded-lg">
                5 Units
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[14px] font-medium transition-colors">
              <ExternalLink className="w-4 h-4" strokeWidth={2} />
              Export as Pdf
            </button>
          </div>

          <p className="text-[13px] text-gray-600 mb-6">
            Properties ready for immediate Sell and lease
          </p>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Property Name
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Transaction
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Size
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Rent/Price
                  </th>
                  <th className="text-left py-3 px-4 text-[13px] font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr
                    key={property.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index === properties.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.name}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.type}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.transaction}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.location}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.size}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-900">
                      {property.price}
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-blue-600" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCribSheet;