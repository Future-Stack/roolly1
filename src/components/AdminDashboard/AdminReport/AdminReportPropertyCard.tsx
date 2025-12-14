import React from 'react';

interface PropertyCardProps {
  propertyName: string;
  location: string;
  leads: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ propertyName, location, leads }) => {
  return (
    <div className="bg-blue-50 rounded-lg px-5 py-4 mb-3 flex items-start justify-between">
      <div>
        <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
          {propertyName}
        </h3>
        <p className="text-[14px] text-gray-600">
          {location}
        </p>
      </div>
      <span className="bg-green-600 text-white text-[13px] font-medium px-3 py-1 rounded whitespace-nowrap">
        {leads} leads
      </span>
    </div>
  );
};

const AdminReportPropertyCard: React.FC = () => {
  const properties: PropertyCardProps[] = [
    {
      propertyName: 'Leeds Industrial Park',
      location: 'Leeds, West Yorkshire',
      leads: 24,
    },
    {
      propertyName: 'Leeds Industrial Park',
      location: 'Leeds, West Yorkshire',
      leads: 19,
    },
    {
      propertyName: 'Leeds Industrial Park',
      location: 'Leeds, West Yorkshire',
      leads: 8,
    },
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="">
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-7">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold text-gray-900 mb-1.5">
              Property Performance Analysis
            </h1>
            <p className="text-[14px] text-gray-600">
              Property performance and insights
            </p>
          </div>

          {/* Property Cards */}
          <div>
            {properties.map((property, index) => (
              <PropertyCard
                key={index}
                propertyName={property.propertyName}
                location={property.location}
                leads={property.leads}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportPropertyCard;