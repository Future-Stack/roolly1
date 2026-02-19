// import React from 'react';

// const PrivacyPolicy: React.FC = () => {
//   const navItems = [
//     "Types of information we collect online",
//     "Information that may be collected automatically",
//     "How we use your information",
//     "Information we share",
//     "Your privacy choice",
//     "Data security",
//     "Third party sites and social media plug-ins",
//     "Contact details"
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-800">
//       {/* --- Blue Header Section with Curve --- */}
//       <header className="relative bg-[#0a3d7a] pt-20 pb-32 text-center text-white">
//         <h1 className="text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
//         <p className="text-sm opacity-90">Updated in: 18 December, 2025</p>

//         {/* SVG for the bottom curve */}
//         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//           <svg 
//             viewBox="0 0 1200 120" 
//             preserveAspectRatio="none" 
//             className="relative block w-full h-[60px] fill-white"
//           >
//             <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
//           </svg>
//         </div>
//       </header>

//       {/* --- Main Content Section --- */}
//       <main className="md:px-[200px] px-6 py-12 flex flex-col md:flex-row gap-12">

//         {/* Sidebar Navigation */}
//         <aside className="md:w-1/4">
//           <nav className="sticky top-8 space-y-6">
//             {navItems.map((item, index) => (
//               <a 
//                 key={index} 
//                 href={`#section-${index}`}
//                 className="block text-sm font-medium text-gray-600 hover:text-[#0a3d7a] transition-colors leading-snug"
//               >
//                 {item}
//               </a>
//             ))}
//           </nav>
//         </aside>

//         {/* Policy Text Content */}
//         <article className="md:w-3/4 space-y-8">
//           <section id="section-0">
//             <h2 className="text-3xl font-bold mb-4">Types of information we collect online</h2>
//             <p className="mb-4 text-gray-700 leading-relaxed">
//               The types of Personal Data that we may collect while you use the Updevision Site are described in this section and include both information that you provide to us and information that we collect automatically when you use the Site.
//             </p>
//             <p className="text-gray-600 italic">
//               [Placeholder for your specific privacy content...]
//             </p>
//           </section>

//           <section id="section-1" className="pt-4">
//             <h3 className="text-xl font-bold mb-3">Personal Data You Provide</h3>
//             <p className="text-gray-600 leading-relaxed">
//               Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
//             </p>
//           </section>

//           {/* Add more sections here mapping to your navItems */}
//         </article>
//       </main>
//     </div>
//   );
// };

// export default PrivacyPolicy;









import React, { useEffect, useState } from 'react';
import {
  useGetPrivacyPolicyQuery,
  useGetPrivacyPolicyByIdQuery
} from '@/redux/features/admin/settings/privacyPolicyApi';
import { Loader2, AlertCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { data: policiesList, isLoading: isListLoading, error: listError } = useGetPrivacyPolicyQuery({});
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);

  // Fetch individual policy details when ID is selected
  const {
    data: selectedPolicy,
    isLoading: isDetailLoading,
    isFetching: isDetailFetching
  } = useGetPrivacyPolicyByIdQuery(selectedPolicyId, {
    skip: !selectedPolicyId
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set default selection to the first policy ID from the list
  useEffect(() => {
    if (policiesList && policiesList.length > 0 && selectedPolicyId === null) {
      setSelectedPolicyId(policiesList[0].id);
    }
  }, [policiesList, selectedPolicyId]);

  if (isListLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 animate-pulse">Loading Privacy Policy...</p>
      </div>
    );
  }

  if (listError) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 text-center max-w-md mb-6 leading-relaxed">
          We couldn't load the privacy policy navigation. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Header Section with Blue Background */}
      <header className="relative bg-[#0a3d7a] pt-20 pb-32 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
        <p className="text-sm opacity-90">Updated in: 18 December, 2025</p>

        {/* SVG for the bottom curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] fill-white"
          >
            <path d="M0,0 C300,160 900,160 1200,0 L1200,160 L0,160 Z"></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav className="sticky top-4">
              <ul className="space-y-4 sm:space-y-12">
                {policiesList?.map((policy: any) => (
                  <li key={policy.id}>
                    <button
                      onClick={() => setSelectedPolicyId(policy.id)}
                      className={`text-left w-full transition-colors font-semibold leading-8 text-lg md:text-xl block ${selectedPolicyId === policy.id ? 'text-blue-700' : 'text-gray-600 hover:text-blue-500'
                        }`}
                    >
                      {policy.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="min-h-[400px]">
              {(isDetailLoading || (isDetailFetching && !selectedPolicy)) ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                  <p className="text-gray-500">Loading details...</p>
                </div>
              ) : selectedPolicy ? (
                <article key={selectedPolicy.id} className="animate-in fade-in duration-500">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black leading-[150%] mb-2 sm:mb-3.5">
                    {selectedPolicy.title}
                  </h2>
                  <div>
                    <p className="text-black leading-6 text-sm sm:text-base font-normal mb-1 whitespace-pre-wrap">
                      {selectedPolicy.content}
                    </p>
                  </div>

                  {/* Sub-sections */}
                  {selectedPolicy.sub_contents?.map((sub: any) => (
                    <div key={sub.id} className="mt-4 md:mt-8 mb-3 sm:mb-4">
                      <h3 className="text-lg md:text-xl font-semibold leading-8 text-gray-900 mb-2">
                        {sub.title}
                      </h3>
                      <p className="text-black leading-6 text-sm sm:text-base font-normal whitespace-pre-wrap">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </article>
              ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-lg">
                    {policiesList && policiesList.length > 0 ? 'Please select a section from the menu.' : 'Detailed policy content is coming soon.'}
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
