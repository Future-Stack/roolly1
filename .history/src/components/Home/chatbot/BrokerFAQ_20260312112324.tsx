// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

// interface FAQItem {
//     question: string;
//     answer: string | React.ReactNode;
// }

// const faqs: FAQItem[] = [
//     {
//         question: "What is Broker360?",
//         answer: "Broker360 is an AI-powered commercial property platform that combines expert brokerage services with smart automation. It helps landlords, vendors, and occupiers manage enquiries faster, improve response times, and never miss valuable leads."
//     },
//     {
//         question: "How does Broker360 improve response time?",
//         answer: "Broker360 sends instant automated replies to enquiries within seconds. AI-powered triaging prioritizes leads using a traffic-light system, while expert brokers are available 24/7 to ensure every enquiry receives prompt and professional attention."
//     },
//     {
//         question: "Why is speed important in commercial property enquiries?",
//         answer: "Fast responses significantly increase conversion rates. Leads contacted within the first hour are far more likely to book viewings, while delayed responses risk losing potential clients. Broker360 ensures every enquiry is handled immediately and efficiently."
//     },
//     {
//         question: "How does Broker360 help list and promote properties?",
//         answer: "Properties can be listed in minutes using a step-by-step guided system. Listings are promoted through high-ranking Google searches, social platforms, and Broker360’s occupier network. Users can also explore properties through filters, location-based searches, and interactive maps."
//     },
//     {
//         question: "What features make Broker360 unique?",
//         answer: (
//             <div className="space-y-2">
//                 <p>Broker360 offers:</p>
//                 <ul className="list-disc pl-5 space-y-1">
//                     <li>Instant auto-replies to enquiries</li>
//                     <li>AI-powered lead scoring and risk profiling</li>
//                     <li>Dedicated broker for each enquiry</li>
//                     <li>24/7 expert broker support</li>
//                     <li>Live performance dashboards</li>
//                     <li>Weekly listing verification to prevent outdated data</li>
//                 </ul>
//                 <p>These features ensure better engagement, smarter prioritization, and higher conversion rates.</p>
//             </div>
//         )
//     },
//     {
//         question: "How does Broker360 benefit occupiers?",
//         answer: "Occupiers enjoy faster access to property information, interactive maps, virtual tours, real-time availability updates, and 24/7 browsing convenience. This allows businesses to make faster, more informed leasing decisions."
//     },
//     {
//         question: "How does Broker360 support landlords and vendors?",
//         answer: "Landlords and vendors benefit from AI-driven enquiry management, automated reporting, enhanced marketing exposure, streamlined listing tools, and faster property turnover. This helps maximize occupancy rates and overall returns."
//     },
//     {
//         question: "How does Broker360 keep listings accurate?",
//         answer: "Landlords receive weekly email prompts to confirm property availability with a simple one-click action. This ensures the platform always displays up-to-date and reliable listings."
//     },
//     {
//         question: "Does Broker360 provide performance tracking?",
//         answer: "Yes. Broker360 includes real-time dashboards that track response times, enquiry performance, lead activity, and engagement metrics. This helps users optimize strategies and improve ROI."
//     },
//     {
//         question: "Who is behind Broker360?",
//         answer: "Broker360 is led by experienced professionals in commercial property, design, and digital platforms. The leadership team combines industry expertise with technical innovation to deliver a modern, high-performance solution."
//     },
//     {
//         question: "What is Broker360’s mission?",
//         answer: "Broker360 aims to transform the future of commercial property by combining AI technology, expert brokers, and real-time engagement tools to ensure every enquiry is acknowledged, prioritized, and converted into opportunities."
//     }
// ];

// const BrokerFAQ: React.FC<{ onBack: () => void }> = ({ onBack }) => {
//     const [activeIndex, setActiveIndex] = useState<number | null>(null);

//     const toggleFAQ = (index: number) => {
//         setActiveIndex(activeIndex === index ? null : index);
//     };

//     return (
//         <div className="flex flex-col h-full bg-white">
//             {/* Navigation Header */}
//             <div className="px-4 py-3 border-b border-gray-100 flex items-center bg-white sticky top-0 z-10">
//                 <button
//                     onClick={onBack}
//                     className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
//                 >
//                     <ArrowLeft size={18} className="text-gray-600" />
//                 </button>
//                 <h2 className="text-sm font-semibold text-gray-800">Frequently Asked Questions</h2>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//                 <div className="mb-4">
//                     <h1 className="text-lg font-bold text-[#0D4B99] leading-tight">
//                         Frequently Asked Questions – Broker360
//                     </h1>
//                 </div>

//                 {faqs.map((faq, index) => (
//                     <div
//                         key={index}
//                         className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/50"
//                     >
//                         <button
//                             className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-gray-100/50"
//                             onClick={() => toggleFAQ(index)}
//                         >
//                             <span className="text-sm font-medium text-gray-700 pr-4">
//                                 {faq.question}
//                             </span>
//                             {activeIndex === index ? (
//                                 <ChevronUp size={16} className="text-blue-600 flex-shrink-0" />
//                             ) : (
//                                 <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
//                             )}
//                         </button>

//                         {activeIndex === index && (
//                             <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
//                                 <div className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
//                                     {faq.answer}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}

//                 <div className="pt-4 pb-8">
//                     <p className="text-xs text-center text-gray-400">
//                         Can't find what you're looking for? Select "I'm looking for customer support" from the main menu.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BrokerFAQ;
