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









import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
       useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3">
            <nav className="  sticky top-4">
              <ul className="space-y-4 sm:space-y-12">
                <li>
                  <a 
                    href="#types-info" 
                    className="text-blue-700 hover:text-blue-900 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Types of information we collect online
                  </a>
                </li>
                <li>
                  <a 
                    href="#auto-collect" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Information that may be collected automatically
                  </a>
                </li>
                <li>
                  <a 
                    href="#usage" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    How we use your information
                  </a>
                </li>
                <li>
                  <a 
                    href="#share" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Information we share
                  </a>
                </li>
                <li>
                  <a 
                    href="#choice" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Your privacy choice
                  </a>
                </li>
                <li>
                  <a 
                    href="#security" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl e block transition-colors"
                  >
                    Data security
                  </a>
                </li>
                <li>
                  <a 
                    href="#third-party" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Third party sites and social media plug-ins
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-600 hover:text-blue-700 font-semibold leading-8 text-lg md:text-xl  block transition-colors"
                  >
                    Contact details
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="">
              {/* Section 1 */}
              <section id="types-info" className="mb-4 sm:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black leading-[150%] mb-2 sm:mb-3.5">
                  Types of information we collect online
                </h2>
             <div >
                   <p className="text-black leading-6  text-sm sm:text-base font-normal mb-1">
                The types of Personal Data that we may collect while you use the Updevision Site are described in this section and include both information that you provide to us and information that we collect Information that may automatically when you use the *** Site.
                </p>
                <p className='text-black leading-6  text-sm sm:text-base font-normal'>
                    For purposes of this Privacy Notice, “Personal Data” means information that identifies you or that could reasonably be used to identify you. Examples of Personal Data include name, address, telephone number and email address.
                </p>
             </div>

                <h3 className="text-lg md:text-xl  font-semibold leading-8 text-gray-900 mt-4 md:mt-8 mb-3 sm:mb-4">
                  Types of information we collect online
                </h3>
       <div>
                 <p className="text-black leading-6  text-sm sm:text-base font-normal mb-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p className="text-black leading-6  text-sm sm:text-base font-normal ">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editor now use Lorem Ipsum as their default modal text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                </p>
       </div>
              </section>

              {/* Section 2 */}
              <section className="mb-4 sm:mb-8">
                <h3 className="text-lg md:text-xl  font-semibold leading-8 text-gray-900 mt-4 md:mt-8 mb-3 sm:mb-4">
                  Personal Data You Provide When *** Sites
                </h3>
                <p className="text-black leading-6  text-sm sm:text-base font-normal mb-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p className="text-black leading-6  text-sm sm:text-base font-normal ">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editor now use Lorem Ipsum as their default modal text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-10 sm:mb-12">
                <h3 className="text-lg md:text-xl  font-semibold leading-8 text-gray-900 mt-4 md:mt-8 mb-3 sm:mb-4">
                  Personal Data You Share During Other Interactions with
                </h3>
                <p className="text-black leading-6  text-sm sm:text-base font-normal mb-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p className="text-black leading-6  text-sm sm:text-base font-normal ">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editor now use Lorem Ipsum as their default modal text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;