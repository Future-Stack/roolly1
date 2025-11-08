// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Download, Eye, Home, Ruler, Mountain } from 'lucide-react';

// const PropertyDetail: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const images = [
//     'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <div className="w-full bg-gray-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
//       <div className="xl:mx-[200px]">
   

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//           {/* Image Carousel */}
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
//               <img 
//                 src={images[currentSlide]}
//                 alt="Property"
//                 className="w-full h-full object-cover"
//               />
              
//               {/* Navigation Buttons */}
//               <button 
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//               >
//                 <ChevronLeft size={24} className="text-gray-700" />
//               </button>
//               <button 
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
//               >
//                 <ChevronRight size={24} className="text-gray-700" />
//               </button>

//               {/* Dots Indicator */}
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                 {images.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-2 h-2 rounded-full transition-all ${
//                       currentSlide === index ? 'bg-blue-600 w-6' : 'bg-white/70'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="space-y-6">
//             {/* Investment Section */}
//             <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
//               <h2 className="text-2xl font-semibold leading-9 text-[#082D5B] mb-3">
//                 Snap up This Great Investment
//               </h2>
//               <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has 
//                 been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
//                 a galley of type and scrambled it to make a specimen book.
//               </p>
              
//               {/* Info Icons */}
//               <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 flex items-center justify-center">
//                     <Ruler size={18} className="text-white" />
//                   </div>
//                   <span className="text-xs sm:text-sm text-gray-700">Sq ft of the listing</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 flex items-center justify-center">
//                     <Mountain size={18} className="text-white" />
//                   </div>
//                   <span className="text-xs sm:text-sm text-gray-700">Eaves height</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 flex items-center justify-center">
//                     <Home size={18} className="text-white" />
//                   </div>
//                   <span className="text-xs sm:text-sm text-gray-700">Yard Space</span>
//                 </div>
//               </div>
//             </div>

//             {/* Facts & Features */}
//             <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
//                 Facts & features
//               </h3>
//               <div className="flex flex-wrap gap-3">
//                 <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//                   <Download size={18} />
//                   <span className="text-sm sm:text-base font-medium">Brochure</span>
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
//                   <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
//                     <span className="text-xs font-bold text-teal-500">R</span>
//                   </div>
//                   <Eye size={18} />
//                   <span className="text-sm sm:text-base font-medium">Fly Through</span>
//                 </button>
//               </div>

//               {/* Agent Avatars */}
//               <div className="flex items-center gap-2 mt-4 pb-4 border-b border-gray-200">
//                 <div className="flex -space-x-2">
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center">
//                     <span className="text-white font-bold text-sm">R</span>
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden">
//                     <img src="https://i.pravatar.cc/150?img=2" alt="Agent" className="w-full h-full object-cover" />
//                   </div>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white overflow-hidden">
//                     <img src="https://i.pravatar.cc/150?img=3" alt="Agent" className="w-full h-full object-cover" />
//                   </div>
//                 </div>
//                 <span className="text-sm text-gray-600">+3</span>
//               </div>

//               {/* Specifications */}
//               <div className="mt-4">
//                 <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
//                   Specifications
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Area:</span>
//                     <span className="font-medium text-gray-900">X sq ft(N/2 acres/hectares for land</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Type of roller shutter:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Length & Width:</span>
//                     <span className="font-medium text-gray-900">2400m X 1200m</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Height & width of shutters:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Office space included:</span>
//                     <span className="font-medium text-gray-900">YES</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Type of lighting:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Eaves height:</span>
//                     <span className="font-medium text-gray-900">800</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">EPC Rating:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Power capacity:</span>
//                     <span className="font-medium text-gray-900">X kva</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">User restrictions:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Single or Three phase:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                   <div className="flex justify-between py-2 border-b border-gray-100">
//                     <span className="text-gray-600">Any further details:</span>
//                     <span className="font-medium text-gray-900">Three</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Exterior Section */}
//             <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
//                   <span className="text-white font-bold">E</span>
//                 </div>
//                 <h4 className="text-lg sm:text-xl font-bold text-gray-900">Exterior</h4>
//               </div>

//               <div className="flex items-center gap-2 mb-4">
//                 <div className="flex -space-x-2">
//                   <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center">
//                     <span className="text-white font-bold text-xs">R</span>
//                   </div>
//                   <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
//                     <img src="https://i.pravatar.cc/150?img=4" alt="Agent" className="w-full h-full object-cover" />
//                   </div>
//                 </div>
//               </div>

//               <h5 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
//                 Specifications
//               </h5>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">Yard space included:</span>
//                   <span className="font-medium text-gray-900">2400m X 1200m</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">Yard surface:</span>
//                   <span className="font-medium text-gray-900">Concrete/tarmac</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">Area of yard:</span>
//                   <span className="font-medium text-gray-900">YES</span>
//                 </div>
//                 <div className="flex justify-between py-2 border-b border-gray-100">
//                   <span className="text-gray-600">Parking included:</span>
//                   <span className="font-medium text-gray-900">Three</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetail;