import React, { useState, useMemo, useEffect } from 'react';
import PropertyListing from './PropertyListing';
import "leaflet/dist/leaflet.css";
import "./leafletConfig";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';
import type { LatLngExpression } from "leaflet";
import { useGetAllUsersPropertyQuery } from '@/redux/features/users/getAllUsersPropertyApi';

const coordinateLookup: Record<string, [number, number]> = {
  'London': [51.5074, -0.1278],
  'Manchester': [53.4808, -2.2426],
  'Liverpool': [53.4084, -2.9916],
  'Birmingham': [52.4862, -1.8904],
  'Leeds': [53.7997, -1.5492],
  'Sheffield': [53.3811, -1.4701],
  'Glasgow': [55.8642, -4.2518],
  'Edinburgh': [55.9533, -3.1883],
  'Cardiff': [51.4816, -3.1791],
  'Belfast': [54.5973, -5.9301],
  'Lancashire': [53.7632, -2.7044],
  'North Wales': [53.1362, -4.0954],
  'South Wales': [51.6000, -3.9167],
  'West Midlands': [52.4862, -1.8904],
  'East Midlands': [52.8300, -1.3270],
  'North East England': [54.9783, -1.6178],
  'North West England': [53.483959, -2.244644],
  'South East England': [51.3556, -0.5593],
  'South West England': [51.4545, -2.5879],
  'Yorkshire and the Humber': [53.9915, -1.5412],
  'Scotland': [56.4907, -4.2026],
  'Wales': [52.1307, -3.7837],
  'Northern Ireland': [54.7877, -6.4923],
  'UK': [55.3781, -3.4360],
  'Bangladesh': [23.6850, 90.3563],
  'Dhaka': [23.8103, 90.4125],
  'Mirpur': [23.8041, 90.3673],
  'Dhanmondi': [23.7461, 90.3742],
  'Uttara': [23.8759, 90.3795],
  'Gulshan': [23.7925, 90.4078],
  'Banani': [23.7937, 90.4066],
  'Mohammadpur': [23.7662, 90.3589],
};

// Component to handle map bounds automatically
const BoundsHandler: React.FC<{ positions: LatLngExpression[] }> = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [positions, map]);

  return null;
};

const MapPropertySection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const { data: propertiesData } = useGetAllUsersPropertyQuery({ page_size: 100 });

  const propertiesWithPositions = useMemo(() => {
    const results = Array.isArray(propertiesData)
      ? propertiesData
      : (propertiesData as any)?.results;
    if (!Array.isArray(results)) return [];

    return results.map((p: any) => {
      const locName = p.location || "";
      // Find matching coordinate key
      const areaKey = Object.keys(coordinateLookup).find(k =>
        locName.toLowerCase().includes(k.toLowerCase())
      );

      return {
        ...p,
        position: areaKey ? coordinateLookup[areaKey] : [23.8103, 90.4125] as [number, number],
        matchedArea: areaKey || "Unknown"
      };
    });
  }, [propertiesData]);

  const allPositions = useMemo(() =>
    propertiesWithPositions.map(p => p.position),
    [propertiesWithPositions]
  );

  const center: LatLngExpression = useMemo(() => {
    if (selectedLocation) {
      const prop = propertiesWithPositions.find(p => p.matchedArea === selectedLocation);
      if (prop) return prop.position;
    }
    return propertiesWithPositions.length > 0 ? propertiesWithPositions[0].position : [23.8103, 90.4125];
  }, [selectedLocation, propertiesWithPositions]);

  return (
    <div className="w-full mx-auto mt-8 sm:mt-8 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">
      <div className="flex flex-col lg:flex-row gap-3 bg-gray-100 border border-[#609BE5] rounded-xl overflow-hidden">

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

              <BoundsHandler positions={allPositions} />

              {propertiesWithPositions.map((prop, idx) => (
                <Marker
                  key={`${prop.id || idx}`}
                  position={prop.position}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation(prop.matchedArea);
                    },
                  }}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold">{prop.title || "Property"}</h3>
                      <p className="text-sm text-blue-600 font-medium">{prop.location}</p>
                      <p className="text-[10px] text-gray-500 mt-1">Click to filter nearby</p>
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
