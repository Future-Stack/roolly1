import React, { useState } from 'react';
import { MessageCircle, Phone, MessageSquare, MapPin, Plus, Minus, Mail } from 'lucide-react';
import map from '../../assets/contactMap.svg'

interface QuickFact {
  label: string;
  value: string | number;
}



import { useDispatch } from 'react-redux';
import { openChatbot, setChatbotView } from '@/redux/features/chatbot/chatbotSlice';

const PropertyMapContact: React.FC = () => {
  const [, setMapZoom] = useState(14);
  const dispatch = useDispatch();

  const handleChatNow = () => {
    dispatch(setChatbotView('survey'));
    dispatch(openChatbot());
  };

  const quickFacts: QuickFact[] = [
    { label: 'Property ID:', value: 1 },
    { label: 'Min. Financials:', value: '£4,500' }
  ];


  return (
    <div className=" w-full mb-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="xl:mx-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                {/* Map Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={map}
                    alt="Property Location Map"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Street View Button */}
                <button className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium">
                  <MapPin size={16} />
                  Street View
                </button>

                {/* Map Controls */}
                <div className="absolute right-4 bottom-4 flex flex-col gap-2">
                  <button
                    onClick={() => setMapZoom(prev => Math.min(prev + 1, 20))}
                    className="bg-white p-2 rounded shadow-lg hover:bg-gray-50 transition"
                  >
                    <Plus size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => setMapZoom(prev => Math.max(prev - 1, 1))}
                    className="bg-white p-2 rounded shadow-lg hover:bg-gray-50 transition"
                  >
                    <Minus size={20} className="text-gray-700" />
                  </button>
                </div>

                {/* Location Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin size={24} className="text-white" />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-4 bg-blue-600"></div>
                  </div>
                </div>

                {/* Copyright Notice */}
                <div className="absolute bottom-2 left-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
                  Map data ©2025 Google
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[13px] border border-[#B6D1F3]  p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Get in touch to arrange a viewing or ask questions about this property.
              </p>

              {/* Contact Buttons */}
              <div className="space-y-3 mb-8">
                <div className='flex items-center gap-4 '>
                  <button className="w-full bg-[#0DC043]  text-white font-medium py-3 px-4 rounded-[8px] transition flex items-center justify-center gap-2">
                    <MessageSquare size={20} />
                    WhatsApp
                  </button>
                  <button className="w-full bg-gray-900  text-white font-medium py-3 px-4 rounded-[8px] transition flex items-center justify-center gap-2">
                    <Phone size={20} />
                    000 2569 06541
                  </button>
                  <button className="w-full bg-gray-900  text-white font-medium py-3 px-4 rounded-[8px] transition flex items-center justify-center gap-2">
                    <Mail size={20} />
                    info@roolly1.com
                  </button>
                </div>
                <button
                  onClick={handleChatNow}
                  className="w-full bg-[#126AD8]  text-white font-medium py-3 px-4 rounded-[8px] transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Chat Now
                </button>
              </div>

              {/* Quick Facts */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-xl leading-6 font-medium text-[#101828] mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  {quickFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-[#303539] text-xl leading-7">{fact.label}</span>
                      <span className="text-[#101828] text-lg leading-7">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMapContact;