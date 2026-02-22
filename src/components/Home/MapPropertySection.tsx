import React, { useState } from 'react';
import PropertyListing from './PropertyListing';
import "leaflet/dist/leaflet.css";
import "./leafletConfig";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { useGetAllUsersPropertyQuery } from '@/redux/features/users/getAllUsersPropertyApi';

const coordinateLookup: Record<string, [number, number]> = {
  'Dhaka': [23.8103, 90.4125],
  'Mirpur': [23.8041, 90.3673],
  'Dhanmondi': [23.7461, 90.3742],
  'Uttara': [23.8759, 90.3795],
  'Gulshan': [23.7925, 90.4078],
  'Banani': [23.7937, 90.4066],
  'Mohammadpur': [23.7662, 90.3589],
  'Manchester': [53.4808, -2.2426],
  'Liverpool': [53.4084, -2.9916],
  'Lancashire': [53.7632, -2.7044],
  'North Wales': [53.1362, -4.0954],
};

const MapPropertySection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const { data: propertiesData } = useGetAllUsersPropertyQuery({ page_size: 100 });


  const normalizeLocation = (loc: string) => loc.split(',')[0].trim();


  const dynamicLocations = React.useMemo(() => {
    const results = Array.isArray(propertiesData)
      ? propertiesData
      : (propertiesData as any)?.results;
    if (!Array.isArray(results)) return [];

    const areaMap = new Map<string, { name: string; count: number }>();

    results.forEach((p: any) => {
      const locName = p.location;
      if (!locName) return;

      const normalized = normalizeLocation(locName);

      const areaKey = Object.keys(coordinateLookup).find(k =>
        normalized.toLowerCase() === k.toLowerCase()
      ) || "Others";

      // if (!areaKey) return;

      const existing = areaMap.get(areaKey);
      if (existing) {
        existing.count++;
      } else {
        areaMap.set(areaKey, { name: areaKey, count: 1 });
      }
    });

    return Array.from(areaMap.values())
      .map(item => ({
        ...item,
        position: coordinateLookup[item.name] || [23.8103, 90.4125]
      }));
  }, [propertiesData]);


  const center: LatLngExpression = React.useMemo(() => {
    if (selectedLocation) {
      const loc = dynamicLocations.find(l => l.name === selectedLocation);
      if (loc) return loc.position;
    }
    return dynamicLocations.length > 0 ? dynamicLocations[0].position : [23.8103, 90.4125];
  }, [selectedLocation, dynamicLocations]);


  return (
    <div className="w-full mx-auto mt-8 sm:mt-8 lg:mt-12 
                px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">

      <div className="flex flex-col lg:flex-row gap-3 
                  bg-gray-100 border border-[#609BE5] rounded-xl overflow-hidden">

        {/* Left Side - MAP */}
        <div className="w-full lg:w-1/2 min-h-[280px] lg:min-h-full z-10">
          <div className="h-[400px] sm:h-[450px] lg:h-[730px] w-full">
            <MapContainer
              center={center}
              zoom={11}
              className="h-full w-full rounded-xl"
              key={center.toString()}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {dynamicLocations.map((loc) => (
                <Marker
                  key={loc.name}
                  position={loc.position}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation(loc.name);
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold">{loc.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{loc.count} Properties</p>
                      <p className="text-[10px] text-gray-500 mt-1">Click to filter properties</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Right Side - Property Listing */}
        <div className="w-full lg:w-1/2 h-full flex flex-col">
          {selectedLocation && (
            <div className="px-4 py-3 bg-blue-50/50 border-b border-blue-100 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">Filter active: {selectedLocation}</span>
              <button
                onClick={() => setSelectedLocation(undefined)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                Clear Filter ✕
              </button>
            </div>
          )}
          <div className="w-full h-full overflow-y-auto max-h-[730px] custom-scrollbar">
            <PropertyListing search={selectedLocation} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapPropertySection;
