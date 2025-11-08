import React from 'react';


import leader1 from '../../assets/LeaderShip1.svg'
import leader2 from '../../assets/leaderShip2.svg'

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

const LeadershipTeam: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Matthew Pickles",
      role: "Founder Director",
      image: leader1,
      description: "Matthew is a seasoned commercial property expert with deep experience across asset management, investment, development and business operations. He's led large, mixed-use portfolios and knows how to deliver real value whether it's through smart leasing, strategic planning, or building high-performing sales and marketing teams."
    },
    {
      name: "Robert Woolley",
      role: "Founder Director",
      image: leader2,
      description: "Matthew is a seasoned commercial property expert with deep experience across asset management, investment, development and business operations. He's led large, mixed-use portfolios and knows how to deliver real value whether it's through smart leasing, strategic planning, or building high-performing sales and marketing teams."
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="xl:mx-[200px]">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black leading-18 mb-4 sm:mb-6">
            Leadership Team
          </h2>
          <p className="text-base  font-medium  text-[#25292C] leading-6 max-w-2xl">
            It is a long established fact that a reader will be distracted by the readable content of a page when 
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
            distribution of letters, as opposed to using 'Content here, content here', making it look like 
            readable English.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-[#E7F0FB] transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image Section */}
                <div className="w-full sm:w-48 md:w-56 lg:w-64 flex-shrink-0">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 sm:h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-7 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#25292C] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-base text-[#25292C] font-semibold mb-4">
                      {member.role}
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3 mb-5 sm:mb-6 border-b border-gray-200 pb-7 ">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1.25C4.27065 1.25 3.57118 1.53973 3.05546 2.05546C2.53973 2.57118 2.25 3.27065 2.25 4C2.25 4.72935 2.53973 5.42882 3.05546 5.94454C3.57118 6.46027 4.27065 6.75 5 6.75C5.72935 6.75 6.42882 6.46027 6.94454 5.94454C7.46027 5.42882 7.75 4.72935 7.75 4C7.75 3.27065 7.46027 2.57118 6.94454 2.05546C6.42882 1.53973 5.72935 1.25 5 1.25ZM3.75 4C3.75 3.66848 3.8817 3.35054 4.11612 3.11612C4.35054 2.8817 4.66848 2.75 5 2.75C5.33152 2.75 5.64946 2.8817 5.88388 3.11612C6.1183 3.35054 6.25 3.66848 6.25 4C6.25 4.33152 6.1183 4.64946 5.88388 4.88388C5.64946 5.1183 5.33152 5.25 5 5.25C4.66848 5.25 4.35054 5.1183 4.11612 4.88388C3.8817 4.64946 3.75 4.33152 3.75 4ZM2.25 8C2.25 7.80109 2.32902 7.61032 2.46967 7.46967C2.61032 7.32902 2.80109 7.25 3 7.25H7C7.19891 7.25 7.38968 7.32902 7.53033 7.46967C7.67098 7.61032 7.75 7.80109 7.75 8V21C7.75 21.1989 7.67098 21.3897 7.53033 21.5303C7.38968 21.671 7.19891 21.75 7 21.75H3C2.80109 21.75 2.61032 21.671 2.46967 21.5303C2.32902 21.3897 2.25 21.1989 2.25 21V8ZM3.75 8.75V20.25H6.25V8.75H3.75ZM9.25 8C9.25 7.80109 9.32902 7.61032 9.46967 7.46967C9.61032 7.32902 9.80109 7.25 10 7.25H14C14.1989 7.25 14.3897 7.32902 14.5303 7.46967C14.671 7.61032 14.75 7.80109 14.75 8V8.434L15.185 8.247C15.9351 7.9266 16.7307 7.72583 17.543 7.652C20.318 7.4 22.75 9.58 22.75 12.38V21C22.75 21.1989 22.671 21.3897 22.5303 21.5303C22.3897 21.671 22.1989 21.75 22 21.75H18C17.8011 21.75 17.6103 21.671 17.4697 21.5303C17.329 21.3897 17.25 21.1989 17.25 21V14C17.25 13.6685 17.1183 13.3505 16.8839 13.1161C16.6495 12.8817 16.3315 12.75 16 12.75C15.6685 12.75 15.3505 12.8817 15.1161 13.1161C14.8817 13.3505 14.75 13.6685 14.75 14V21C14.75 21.1989 14.671 21.3897 14.5303 21.5303C14.3897 21.671 14.1989 21.75 14 21.75H10C9.80109 21.75 9.61032 21.671 9.46967 21.5303C9.32902 21.3897 9.25 21.1989 9.25 21V8ZM10.75 8.75V20.25H13.25V14C13.25 13.2707 13.5397 12.5712 14.0555 12.0555C14.5712 11.5397 15.2707 11.25 16 11.25C16.7293 11.25 17.4288 11.5397 17.9445 12.0555C18.4603 12.5712 18.75 13.2707 18.75 14V20.25H21.25V12.38C21.25 10.476 19.589 8.972 17.68 9.146C17.0241 9.2055 16.3817 9.36747 15.776 9.626L14.296 10.261C14.1818 10.31 14.0573 10.3299 13.9336 10.3189C13.8098 10.3079 13.6907 10.2663 13.587 10.1979C13.4833 10.1295 13.3982 10.0364 13.3394 9.927C13.2806 9.81757 13.2499 9.69524 13.25 9.571V8.75H10.75Z" fill="#126AD8"/>
                    </svg>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2.5 12C2.5 7.522 2.5 5.282 3.891 3.891C5.282 2.5 7.521 2.5 12 2.5C16.478 2.5 18.718 2.5 20.109 3.891C21.5 5.282 21.5 7.521 21.5 12C21.5 16.478 21.5 18.718 20.109 20.109C18.718 21.5 16.479 21.5 12 21.5C7.522 21.5 5.282 21.5 3.891 20.109C2.5 18.718 2.5 16.479 2.5 12Z" stroke="#126AD8" stroke-width="1.5" stroke-linejoin="round"/>
                        <path d="M16.5 12C16.5 13.1935 16.0259 14.3381 15.182 15.182C14.3381 16.0259 13.1935 16.5 12 16.5C10.8065 16.5 9.66193 16.0259 8.81802 15.182C7.97411 14.3381 7.5 13.1935 7.5 12C7.5 10.8065 7.97411 9.66193 8.81802 8.81802C9.66193 7.97411 10.8065 7.5 12 7.5C13.1935 7.5 14.3381 7.97411 15.182 8.81802C16.0259 9.66193 16.5 10.8065 16.5 12Z" stroke="#126AD8" stroke-width="1.5"/>
                        <path d="M17.508 6.5H17.498" stroke="#126AD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>

                    {/* Description */}
                    <p className="text-base text-[#444A50] mt-7 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;