import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight,  Home, Ruler, Mountain } from "lucide-react";
import { properties } from "@/data/properties";
import brochure from '../../assets/brochure.svg'
import flyThrough from '../../assets/flythrough.svg'

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === Number(id));

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!property) return <p>Property not found</p>;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % property.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // --- Helper function to format keys (camelCase -> readable) ---
  const formatKey = (key: string) => {
    if (key === "ePCRating") return "EPC Rating";
    if (key === "yardSurface") return "Yard Surface";
    if (key === "areaOfYard") return "Area of Yard";
    if (key === "yardSpace") return "Yard Space";
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  // Keys for Internals columns
  const internalLeftKeys = [
    "area",
    "lengthWidth",
    "officeSpaceIncluded",
    "eavesHeight",
    "powerCapacity",
    "singleOrThreePhase",
  ];
  const internalRightKeys = [
    "typeOfRollerShutter",
    "heightWidthOfShutters",
    "typeOfLighting",
    "ePCRating",
    "userRestrictions",
    "anyFurtherDetails",
  ];

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="xl:mx-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* IMAGE CAROUSEL */}
          <div className="">
            <div className="relative h-full">
              <img
                src={property.images[currentSlide]}
                alt={property.title}
                className="w-full h-full rounded-[8px] object-cover"
              />
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentSlide === index ? "bg-blue-600 w-6" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {/* DESCRIPTION */}
            <div className="bg-white border-b border-gray-300 p-4">
              <h2 className="text-2xl font-semibold leading-9 text-[#082D5B] mb-3">
                Snap up This Great Investment
              </h2>
              <p className="text-sm sm:text-base text-[#25292C] leading-6 mb-4">
                {property.description}
              </p>

              <div className="flex flex-wrap gap-5 sm:gap-6 mb-4">
                <div className="flex items-center gap-1.5">
                  <Ruler size={20} className="text-[#0A3A77]" />
                  <span className="text-lg text-[#0A3A77] font-medium leading-6">
                    Sq ft: {property.specs.area}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mountain size={20} className="text-[#0A3A77]" />
                  <span className="text-lg text-[#0A3A77] font-medium leading-6">
                    Eaves height: {property.specs.eavesHeight}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Home size={20} className="text-[#0A3A77]" />
                  <span className="text-lg text-[#0A3A77] font-medium leading-6">
                    Yard Space: {property.exterior.yardSpace}
                  </span>
                </div>
              </div>
            </div>

            <div>
                <h1 className="mb-8 text-2xl text-[#082D5B] font-semibold leading-6  ">Facts & features</h1>
                <div className="flex items-center gap-5">
                    <button className="flex items-center text-[#126AD8] font-medium text-base border border-[#0D4B99] py-3 px-5 rounded-[8px] leading-6 gap-2"> 
                        <img src={brochure} alt="" />
                         Brochure</button>
                    <button className="flex items-center text-[#126AD8] font-medium text-base border border-[#0D4B99] py-3 px-5 rounded-[8px] leading-6 gap-2"> 
                    <img src={flyThrough} alt="" />
                         Fly Through</button>
                </div>
            </div>

            {/* --- Internals: Specifications --- */}
            <div className=" mt-6">
              <h3 className="text-2xl bg-[#E7F0FB] w-full py-2.5 px-5 font-medium text-black mb-5 leading-9 ">
                Internals 
              </h3>
                    <h2 className="text-[#000000] text-xl font-semibold leading-7 mb-5 ">Specifications</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 text-sm">
            
                
            
                {/* LEFT COLUMN */}
<ul className="space-y-2 list-disc list-inside text-gray-600">
  {internalLeftKeys.map((key) => {
    const value = property.specs[key as keyof typeof property.specs];
    if (!value) return null;
    return (
     <li key={key} className="py-1">
  <span className="text-gray-600 text-sm">{formatKey(key)} -</span>
  <span className="font-medium text-black text-base ml-4">
    {(() => {
      const val = String(property.specs[key as keyof typeof property.specs]);
      
      if (key === "lengthWidth") {
        return val.split(" ").map((part, idx) =>
          part.toLowerCase() === "sq" ? (
            <span key={idx} className="text-green-600">{part}</span>
          ) : (
            <span key={idx}> {part} </span>
          )
        );
      }

      if (key === "powerCapacity") {
        return val.split(" ").map((part, idx) =>
          part.toLowerCase() === "kva" ? (
            <span key={idx} className="text-green-600">{part}</span>
          ) : (
            <span key={idx}> {part} </span>
          )
        );
      }

    
      return val;
    })()}
  </span>
</li>

    );
  })}
</ul>

{/* RIGHT COLUMN */}
<ul className="space-y-2 list-disc list-inside text-gray-600">
  {internalRightKeys.map((key) => {
    const value = property.specs[key as keyof typeof property.specs];
    if (!value) return null;
    return (
      <li key={key} className="py-1">
        <span className="text-gray-600 text-sm ">{formatKey(key)} -</span>
        <span className="font-medium text-black text-base ml-4">{value}</span>
      </li>
    );
  })}
</ul>
              </div>
            </div>

            {/* --- Externals: Specifications --- */}
            <div className=" mt-6">
                <h3 className="text-2xl bg-[#E7F0FB] w-full py-2.5 px-5 font-medium text-black mb-5 leading-9 ">
                Externals 
              </h3>
                    <h2 className="text-[#000000] text-xl font-semibold leading-7 mb-5 ">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* LEFT COLUMN */}
               <ul className="space-y-2 list-disc list-inside text-gray-600">
  {["yardSpace", "areaOfYard"].map((key) => (
<li key={key} className="py-1">
  <span className="text-gray-600 text-sm">{formatKey(key)} -</span>
  <span className="font-medium text-black text-base ml-4">
    {(() => {
      const val = String(property.exterior[key as keyof typeof property.exterior]);
      
      if (key === "yardSpace") {
     
        return val.split(" ").map((part, idx) =>
          part.toLowerCase() === "sq" ? (
            <span key={idx} className="text-green-600">{part}</span>
          ) : (
            <span key={idx}> {part} </span>
          )
        );
      }

      return val;
    })()}
  </span>
</li>

  ))}
</ul>

{/* Externals - RIGHT */}
<ul className="space-y-2 list-disc list-inside text-gray-600">
  {["yardSurface", "parkingIncluded"].map((key) => (
    <li key={key} className="py-1">
      <span className="text-gray-600 text-sm ">{formatKey(key)} -</span>
      <span className="font-medium text-black text-base ml-4">
        {property.exterior[key as keyof typeof property.exterior]}
      </span>
    </li>
  ))}
</ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
