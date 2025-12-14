import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Calendar, Info, MoreVertical, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  name: string;
  propertyId: string;
  location: string;
  timeAgo: string;
  date: string;
  infoMessage: string;
  propertyType: string;
  sqft: string;
  transaction: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  propertyId,
  location,
  timeAgo,
  date,
  infoMessage,
  propertyType,
  sqft,
  transaction,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 mb-4">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-[17px] font-medium text-gray-900">{name}</h3>
          <div className="relative -mt-1" ref={dropdownRef}>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <MoreVertical size={20} />
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-22 bg-[#FDFEFF] border border-gray-200 rounded-lg shadow-lg z-10 flex justify-center">
                <div className="py-1">
                 <Link to='1/view'>
                  <button className="w-full  py-2.5 text-center text-[#1D1F22] hover:bg-gray-50 text-sm font-medium">
                    View 
                  </button>
                 </Link>
                  <Link to='1'>
                  <button className="w-full py-2.5 text-center text-[#1D1F22] hover:bg-gray-50 text-sm font-medium">
                    Edit
                  </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Property Details Row */}
        <div className="flex items-center gap-4 text-[13px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={2} />
            <span>{propertyId}: {location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} strokeWidth={2} />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} strokeWidth={2} />
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-5 mb-4 bg-blue-50 border border-blue-200 rounded-md px-3 py-2.5">
        <div className="flex items-start gap-2">
          <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-blue-700">{infoMessage}</p>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 mb-5">
          {/* Property Type */}
          <div>
            <div className="text-[13px] text-gray-500 mb-1">Property Type</div>
            <div className="text-[15px] text-gray-900 font-normal">{propertyType}</div>
          </div>

          {/* SQFT */}
          <div>
            <div className="text-[13px] text-gray-500 mb-1">SQFT</div>
            <div className="text-[15px] text-gray-900 font-normal">{sqft}</div>
          </div>

          {/* Transaction */}
          <div>
            <div className="text-[13px] text-gray-500 mb-1">Transaction</div>
            <div className="text-[15px] text-gray-900 font-normal">{transaction}</div>
          </div>
        </div>

        {/* Source and Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-[13px] text-gray-500 mb-1.5">Source</div>
            <button className="px-4 py-1.5 text-[13px] text-blue-600 font-medium border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
              From Vendor
            </button>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-[14px] font-medium rounded-sm transition-colors">
              <MessageSquare size={18} strokeWidth={2} />
              Message Vendor
            </button>
            <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium rounded-sm transition-colors">
              View and Update Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyApplication: React.FC = () => {
  const properties: PropertyCardProps[] = [
    {
      name: 'Lisa Anderson',
      propertyId: 'PRO01',
      location: 'Central Manchester Office Suite',
      timeAgo: '6m ago',
      date: '22/10/2025',
      infoMessage: 'Property Information From Vendor. Ready to process quickly.',
      propertyType: 'Land',
      sqft: '1,000 sq',
      transaction: 'Rent',
    },
    {
      name: 'Lisa Anderson',
      propertyId: 'PRO01',
      location: 'Central Manchester Office Suite',
      timeAgo: '6m ago',
      date: '22/10/2025',
      infoMessage: 'Property Information From Vendor. Ready to process quickly.',
      propertyType: 'Land',
      sqft: '1,000 sq',
      transaction: 'Rent',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyApplication;