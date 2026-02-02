import React from 'react';
import PropertyListing from './PropertyListing';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

const MapPropertySection: React.FC = () => {
  const center: LatLngExpression = [23.8103, 90.4125];

  return (
    <div className="w-full mx-auto mt-8 sm:mt-8 lg:mt-12 
                px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-24">

      <div className="flex flex-col lg:flex-row gap-3 
                  bg-gray-100 border border-[#609BE5] rounded-xl overflow-hidden">

        {/* Left Side - MAP */}
        <div className="w-full lg:w-1/2 min-h-[280px] lg:min-h-full">
          <div className="h-[280px] sm:h-[350px] lg:h-full w-full">
            <MapContainer
              center={center}
              zoom={13}
              className="h-full w-full rounded-xl"
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={center}>
                <Popup>Property Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Right Side - Property Listing */}
        <div className="w-full lg:w-1/2 flex">
          <div className="w-full h-full">
            <PropertyListing />
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapPropertySection;