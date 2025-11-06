import React from 'react';

import finImg from '../../assets/cantFindsec.svg'
import clock from '../../assets/clock.svg'
import easy from '../../assets/easycan.svg'

const CantFindSection: React.FC = () => {
  const features = [
    {
      icon: clock,
      title: 'Immediate',
      subtitle: 'Response',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
  <path d="M6.65834 30.1771C8.42917 28.9021 10.3083 27.8944 12.2958 27.1542C14.2819 26.4125 16.4333 26.0417 18.75 26.0417C21.0667 26.0417 23.2181 26.4125 25.2042 27.1542C27.1903 27.8958 29.0694 28.9028 30.8417 30.175C32.2167 28.7514 33.3229 27.0708 34.1604 25.1333C34.9979 23.1931 35.4167 21.0653 35.4167 18.75C35.4167 14.1319 33.7938 10.1993 30.5479 6.95208C27.3021 3.70486 23.3694 2.08194 18.75 2.08333C14.1306 2.08472 10.1979 3.70833 6.95209 6.95417C3.70625 10.2 2.08334 14.1319 2.08334 18.75C2.08334 21.0653 2.50209 23.1931 3.33959 25.1333C4.17709 27.0722 5.28334 28.7528 6.65834 30.175M18.7521 19.7917C16.9965 19.7917 15.5153 19.1889 14.3083 17.9833C13.1014 16.7778 12.4986 15.2979 12.5 13.5438C12.5014 11.7896 13.1042 10.3083 14.3083 9.1C15.5125 7.89167 16.9931 7.28889 18.75 7.29167C20.5069 7.29444 21.9875 7.89722 23.1917 9.1C24.3958 10.3028 24.9986 11.7833 25 13.5417C25.0014 15.3 24.3986 16.7806 23.1917 17.9833C21.9847 19.1861 20.5049 19.7889 18.7521 19.7917ZM18.75 37.5C16.1347 37.5 13.6868 37.0132 11.4063 36.0396C9.1257 35.066 7.14097 33.7354 5.45209 32.0479C3.7632 30.3604 2.43264 28.3757 1.46042 26.0937C0.488197 23.8118 0.00139185 21.3639 2.96349e-06 18.75C-0.00138593 16.1361 0.48542 13.6882 1.46042 11.4062C2.43542 9.12431 3.76598 7.13958 5.45209 5.45208C7.14097 3.76458 9.1257 2.43403 11.4063 1.46042C13.6868 0.486805 16.1347 0 18.75 0C21.3653 0 23.8132 0.486805 26.0938 1.46042C28.3743 2.43403 30.359 3.76458 32.0479 5.45208C33.7368 7.13958 35.0674 9.12431 36.0396 11.4062C37.0118 13.6882 37.4986 16.1361 37.5 18.75C37.5014 21.3639 37.0146 23.8118 36.0396 26.0937C35.0646 28.3757 33.734 30.3604 32.0479 32.0479C30.359 33.7354 28.3743 35.066 26.0938 36.0396C23.8132 37.0132 21.3653 37.5 18.75 37.5ZM18.75 35.4167C20.6708 35.4167 22.5604 35.0806 24.4188 34.4083C26.2771 33.7375 27.8833 32.8181 29.2375 31.65C27.8847 30.5625 26.3188 29.7035 24.5396 29.0729C22.7604 28.4424 20.8306 28.1264 18.75 28.125C16.6694 28.1236 14.7326 28.4326 12.9396 29.0521C11.1465 29.6715 9.58681 30.5375 8.26042 31.65C9.61459 32.8167 11.2215 33.7361 13.0813 34.4083C14.941 35.0806 16.8306 35.4167 18.75 35.4167ZM18.75 17.7083C19.9194 17.7083 20.9062 17.3062 21.7104 16.5021C22.5146 15.6979 22.9167 14.7111 22.9167 13.5417C22.9167 12.3722 22.5146 11.3854 21.7104 10.5813C20.9062 9.77708 19.9194 9.375 18.75 9.375C17.5806 9.375 16.5938 9.77708 15.7896 10.5813C14.9854 11.3854 14.5833 12.3722 14.5833 13.5417C14.5833 14.7111 14.9854 15.6979 15.7896 16.5021C16.5938 17.3062 17.5806 17.7083 18.75 17.7083Z" fill="#126AD8"/>
</svg>,
      title: 'Personal',
      subtitle: 'Service',
    },
    {
      icon: easy,
      title: 'Easy',
      subtitle: 'Scheduling',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" fill="none">
  <path d="M17.6667 42.6667C17.6667 42.6667 1 30.1667 1 17.6667C1 7.25 9.33333 1 17.6667 1C26 1 34.3333 7.25 34.3333 17.6667C34.3333 30.1667 17.6667 42.6667 17.6667 42.6667ZM17.6667 23.9167C19.3243 23.9167 20.914 23.2582 22.0861 22.0861C23.2582 20.914 23.9167 19.3243 23.9167 17.6667C23.9167 16.0091 23.2582 14.4194 22.0861 13.2473C20.914 12.0751 19.3243 11.4167 17.6667 11.4167C16.0091 11.4167 14.4194 12.0751 13.2472 13.2473C12.0751 14.4194 11.4167 16.0091 11.4167 17.6667C11.4167 19.3243 12.0751 20.914 13.2472 22.0861C14.4194 23.2582 16.0091 23.9167 17.6667 23.9167Z" stroke="#126AD8" stroke-width="2"/>
</svg>,
      title: 'Property',
      subtitle: 'Nationwide',
    },
  ];

  return (
    <div className=" bg-white w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:mr-[200px]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className=" rounded-2xl overflow-hidden">
              <img
                src={finImg}
                alt="Modern building with blue sky"
                className="h-[836px] "
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-semibold text-black mb-8 leading-18 ">
                Can't find what you <br /> are looking for?
              </h2>
              <p className="text-[#303539] text-2xl font-medium  leading-9 mb-8">
                Let us know your requirements{' '}
               
                {' '}We're always updating our listings and if a property comes up that matches what you need, you'll be the first to know, with early access before it goes live.
              </p>

              {/* Explore Button */}
              <button className="px-8 py-3 bg-[#126AD8] text-white rounded-[8px] text-base font-semibold  transition-colors duration-300">
                Explore
              </button>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 mt-[100px] sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-blue-50 rounded-xl p-6 text-center h-[200px] transition-colors duration-300"
                >
                  <div className="flex justify-center mb-3">
  <div className="w-12 h-12  flex items-center justify-center">
    {typeof feature.icon === 'string' ? (
      <img src={feature.icon} alt={feature.title} className="" />
    ) : (
      feature.icon
    )}
  </div>
</div>

                  <h3 className="text-[#1D1F22] font-medium text-xl mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-[#1D1F22] text-xl font-medium">
                    {feature.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantFindSection;