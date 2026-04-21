import React, { useState, useMemo, useEffect } from 'react';
import PropertyListing from './PropertyListing';
import "leaflet/dist/leaflet.css";
import "./leafletConfig";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from 'leaflet';
import type { LatLngExpression } from "leaflet";
import { useGetAllUsersPropertyQuery } from '@/redux/features/users/getAllUsersPropertyApi';
import { Search, MapPin, X, Navigation, Building2, ExternalLink, CornerUpRight } from 'lucide-react';

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

// Component to handle map center/zoom from external buttons
const MapController: React.FC<{ zoom: number; center: LatLngExpression }> = ({ zoom, center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [zoom, center, map]);
  return null;
};

// Component to handle map bounds automatically
const BoundsHandler: React.FC<{ positions: LatLngExpression[], isFiltered: boolean }> = ({ positions, isFiltered }) => {
  const map = useMap();

  useEffect(() => {
    if (isFiltered && positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [positions, map, isFiltered]);

  return null;
};

const MapPropertySection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [geocodedPositions, setGeocodedPositions] = useState<Record<number, [number, number]>>({});
  const [zoom, setZoom] = useState(6);
  const [showStreetView, setShowStreetView] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  
  // Radius Search States
  const [searchCenter, setSearchCenter] = useState<[number, number] | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(5); // default 5 miles
  
  const { data: propertiesData, isLoading: propsLoading } = useGetAllUsersPropertyQuery({ page_size: 100 });

  // Update zoom when searchCenter changes
  useEffect(() => {
    if (searchCenter || selectedProperty || selectedLocation) {
      setZoom(12);
    } else {
      setZoom(6);
    }
  }, [searchCenter, selectedProperty, selectedLocation]);

  // Haversine formula in miles
  const getDistanceMiles = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3958.8;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Dynamic Geocoding Logic
  useEffect(() => {
    const results = Array.isArray(propertiesData) ? propertiesData : (propertiesData as any)?.results;
    if (!Array.isArray(results)) return;

    const geocodeAll = async () => {
      const newGeocoded: Record<number, [number, number]> = { ...geocodedPositions };
      let changed = false;

      for (const p of results) {
        if (p.postcode && !newGeocoded[p.id]) {
          try {
            const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(p.postcode)}`);
            const data = await response.json();
            if (data.status === 200 && data.result) {
              newGeocoded[p.id] = [data.result.latitude, data.result.longitude];
              changed = true;
            }
          } catch (err) {
            console.warn(`Geocoding failed for postcode: ${p.postcode}`, err);
          }
        }
      }

      if (changed) {
        setGeocodedPositions(newGeocoded);
      }
    };

    geocodeAll();
  }, [propertiesData]);

  const propertiesWithPositions = useMemo(() => {
    const results = Array.isArray(propertiesData)
      ? propertiesData
      : (propertiesData as any)?.results;
    if (!Array.isArray(results)) return [];

    const usedPositions: Record<string, number> = {};

    return results.map((p: any) => {
      let pos: [number, number];
      let matchedArea: string;

      // 1. Check geocoded state
      if (geocodedPositions[p.id]) {
        pos = geocodedPositions[p.id];
        matchedArea = p.location || "Custom";
      } else {
        // 2. Fallback to lookup
        const locName = p.location || "";
        const areaKey = Object.keys(coordinateLookup).find(k =>
          locName.toLowerCase().includes(k.toLowerCase())
        );
        pos = areaKey ? coordinateLookup[areaKey] : [54.5, -3.2];
        matchedArea = areaKey || "Unknown";
      }

      // 3. Apply Jitter to avoid stacking
      const posKey = `${pos[0].toFixed(6)},${pos[1].toFixed(6)}`;
      if (usedPositions[posKey] !== undefined) {
        usedPositions[posKey]++;
        const count = usedPositions[posKey];
        // Create a slight spiral/offset pattern
        const jitterLat = pos[0] + Math.sin(count) * 0.0002;
        const jitterLng = pos[1] + Math.cos(count) * 0.0002;
        pos = [jitterLat, jitterLng];
      } else {
        usedPositions[posKey] = 0;
      }

      return {
        ...p,
        position: pos,
        matchedArea
      };
    });
  }, [propertiesData, geocodedPositions]);

  const filteredProperties = useMemo(() => {
    if (!selectedLocation) return propertiesWithPositions;
    
    if (searchCenter) {
      return propertiesWithPositions.filter(p => {
        const pos = p.position as [number, number];
        const dist = getDistanceMiles(searchCenter[0], searchCenter[1], pos[0], pos[1]);
        if (dist <= searchRadius) return true;
        // fallback to text match just in case
        return (p.location || "").toLowerCase().includes(selectedLocation.toLowerCase()) ||
               (p.matchedArea || "").toLowerCase().includes(selectedLocation.toLowerCase());
      });
    }

    return propertiesWithPositions.filter(p => 
      (p.location || "").toLowerCase().includes(selectedLocation.toLowerCase()) ||
      (p.matchedArea || "").toLowerCase().includes(selectedLocation.toLowerCase())
    );
  }, [selectedLocation, searchCenter, searchRadius, propertiesWithPositions]);

  const allPositions = useMemo(() =>
    filteredProperties.map(p => p.position as LatLngExpression),
    [filteredProperties]
  );

  const center: LatLngExpression = useMemo(() => {
    if (searchCenter) return searchCenter as LatLngExpression;
    return [54.5, -3.2]; // UK
  }, [searchCenter]);

  const streetViewQuery = useMemo(() => {
    if (selectedLocation) return selectedLocation;
    if (filteredProperties.length > 0) return filteredProperties[0].location || filteredProperties[0].postcode || 'Manchester';
    return 'Manchester';
  }, [selectedLocation, filteredProperties]);

  const streetViewUrl = `https://maps.google.com/maps?q=${encodeURIComponent(streetViewQuery)}&layer=c&cbll=${encodeURIComponent(streetViewQuery)}&cbp=12,0,0,0,0&output=svembed`;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const q = searchInput.trim();
      setSelectedLocation(q);
      setSearchInput("");
      
      const areaKey = Object.keys(coordinateLookup).find(k => k.toLowerCase() === q.toLowerCase());
      if (areaKey) {
        setSearchCenter(coordinateLookup[areaKey]);
        return;
      }
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=gb,bd`);
        const data = await res.json();
        if (data && data.length > 0) {
          setSearchCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          return;
        }
      } catch (err) {
        console.warn("Geocoding lookup failed", err);
      }
      
      // Fallback
      const match = propertiesWithPositions.find(p => (p.location || "").toLowerCase().includes(q.toLowerCase()));
      if (match) setSearchCenter(match.position as [number, number]);
      else setSearchCenter(null);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 sm:mt-8 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24 font-outfit">
      
      {/* Property Details Header (Like DetailsPage) */}
      <div className="mb-6 bg-white p-5 rounded-xl border border-[#B6D1F3] shadow-sm transition-all animate-in fade-in slide-in-from-top-2">
        {selectedProperty ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#082D5B] mb-1">
                {selectedProperty.property_name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {/* <div className="flex items-center gap-1.5 text-gray-600">
                   <Home size={16} className="text-[#126AD8]" />
                   <span>{parseInt(selectedProperty.built_area)} Sqft</span> 
                </div> */}
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin size={16} className="text-[#126AD8]" />
                  <span>{selectedProperty.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {/* <p className="text-[22px] font-bold text-[#126AD8]">
                £{selectedProperty.price}
                <span className="text-sm font-semibold ml-1">
                  {selectedProperty.price_type === 'pcm' ? '/PCM' : selectedProperty.price_type === 'pa' ? '/PA' : ''}
                </span>
              </p> */}
              <button 
                onClick={() => setSelectedProperty(null)}
                className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Selection ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-[22px] sm:text-[26px] font-bold text-gray-900 leading-tight">
              Find Your Perfect Commercial <span className="text-blue-600">Space & Location</span>
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Building2 size={16} className="text-blue-500" />
              <span>{filteredProperties.length} Properties Available</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 bg-gray-100 border border-[#609BE5] rounded-xl overflow-hidden shadow-sm">

        {/* Left Side - MAP */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-[730px] relative z-10 bg-white group">
          
          {/* Floating Map Info Card (Google Maps Style) */}
          <div className="absolute top-4 left-4 z-[1001] bg-white rounded-lg shadow-xl border border-gray-100 p-1.5 flex items-center gap-3 min-w-[300px] sm:min-w-[360px] pointer-events-auto transition-all animate-in fade-in slide-in-from-left-2">
            <button 
              onClick={() => setShowStreetView(!showStreetView)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] px-4 py-2.5 rounded shadow-sm transition-all whitespace-nowrap"
            >
              {showStreetView ? 'Back to Map' : 'Street View'}
            </button>
            
            <div className="flex-1 min-w-0 pr-1">
              <p className="text-[13px] font-semibold text-gray-800 truncate leading-tight font-outfit">
                {selectedProperty ? `${selectedProperty.location}` : 'Explore Featured Properties'}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1 font-outfit">
                {selectedProperty ? 'Property selected' : 'No selection'} • UK
              </p>
            </div>

            <div className="flex items-center gap-1 border-l border-gray-100 pl-2 pr-1">
              <button 
                title="View Details"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center justify-center bg-blue-50/30"
              >
                <ExternalLink size={18} />
              </button>
              <button 
                title="Get Directions"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center justify-center bg-blue-50/30"
              >
                <CornerUpRight size={18} />
              </button>
            </div>
          </div>

          {/* Location Search Overlay */}
          <div className="absolute top-4 right-4 sm:w-72 z-[1001]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Area search..."
                className="w-full h-11 pl-10 pr-4 text-sm bg-white border-2 border-blue-100 rounded-lg shadow-lg focus:outline-none focus:border-blue-500 transition-all font-outfit"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-1.5 rounded-md hover:bg-blue-700"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="h-full w-full">
            {showStreetView ? (
              <iframe
                src={streetViewUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Street View"
              />
            ) : (
              <MapContainer
                center={center}
                zoom={zoom}
                zoomControl={false}
                className="h-full w-full"
                key={center.toString()}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController zoom={zoom} center={center} />
                <BoundsHandler positions={allPositions} isFiltered={!!selectedLocation || !!searchCenter} />

                {filteredProperties.map((prop, idx) => (
                  <Marker
                    key={`${prop.id || idx}`}
                    position={prop.position as LatLngExpression}
                    eventHandlers={{
                      click: () => {
                        setSelectedLocation(prop.matchedArea !== "Unknown" ? prop.matchedArea : prop.location);
                        setSearchCenter(prop.position as [number, number]);
                        setSelectedProperty(prop);
                      },
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <span className="font-semibold">{prop.property_name}</span>
                    </Tooltip>
                    <Popup>
                      <div className="text-center p-1">
                        <h3 className="font-bold text-gray-900 leading-tight">{prop.property_name || "Property"}</h3>
                        <p className="text-xs text-blue-600 font-medium mt-1">{prop.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>

          {/* Custom Map Zoom Controls */}
          {!showStreetView && (
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-[1001]">
              <button 
                onClick={() => setZoom(z => Math.min(z + 1, 21))}
                className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center transition-colors border border-gray-200"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(z => Math.max(z - 1, 1))}
                className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center transition-colors border border-gray-200"
              >
                −
              </button>
            </div>
          )}
        </div>

        {/* Right Side - Property Listing */}
        <div className="w-full lg:w-1/2 h-full flex flex-col bg-white border-l border-gray-200">
          {selectedLocation && (
            <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Filter active: {selectedLocation}
              </span>
              <button
                onClick={() => {
                  setSelectedLocation(undefined);
                  setSearchCenter(null);
                  setSelectedProperty(null);
                }}
                className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors bg-red-50 px-2.5 py-1.5 rounded-md border border-red-100"
              >
                Clear Filter <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <div className="w-full h-full overflow-y-auto max-h-[730px] custom-scrollbar">
            <PropertyListing 
              search={selectedLocation} 
              properties={filteredProperties}
              isLoading={propsLoading}
              radius={searchRadius}
              onRadiusChange={setSearchRadius}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapPropertySection;


//  <div className="w-full  h-80 lg:h-full relative">
//   {/* Street View Button */}
//   <button className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded shadow-lg z-10 transition-colors">
//     Street View
//   </button>

//   {/* Google Map */}
//   <iframe
//     src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
//     width="100%"
//     height="100%"
//     style={{ border: 0 }}
//     loading="lazy"
//     className="w-full h-full"
//   />
//    {propertiesWithPositions.map((prop, idx) => (
//                 <Marker
//                   key={`${prop.id || idx}`}
//                   position={prop.position}
//                   eventHandlers={{
//                     click: () => {
//                       setSelectedLocation(prop.matchedArea);
//                     },
//                   }}
//                 >
//                   <Popup>
//                     <div className="text-center">
//                       <h3 className="font-bold">{prop.title || "Property"}</h3>
//                       <p className="text-sm text-blue-600 font-medium">{prop.location}</p>
//                       <p className="text-[10px] text-gray-500 mt-1">Click to filter nearby</p>
//                     </div>
//                   </Popup>
//                 </Marker>
//               ))}

//   {/* Map Controls (UI only) */}
//   <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
//     <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center">
//       +
//     </button>
//     <button className="bg-white hover:bg-gray-100 text-gray-700 font-bold text-xl w-10 h-10 rounded shadow-md flex items-center justify-center">
//       −
//     </button>
//   </div>
// </div> 