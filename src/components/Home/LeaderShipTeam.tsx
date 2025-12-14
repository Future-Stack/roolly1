import { Instagram, Linkedin } from 'lucide-react';
import React from 'react';

interface TeamMemberProps {
  image: string;
  name: string;
  role: string;
  description: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  image,
  name,
  role,
  description,
  linkedinUrl,
  instagramUrl,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-md transition-shadow border border-[#E7F0FB] p-2">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-2/5 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 flex flex-col">
          {/* Name and Role */}
          <div className="mb-6 ml-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-base font-medium text-gray-700 mb-4">{role}</p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base leading-relaxed ml-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const LeadershipTeam: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      name: 'Matthew Pickles',
      role: 'Founder Director',
      description: "Matthew is a seasoned commercial property expert with deep experience across asset management, investment strategy, and business operations. He's led large, mixed-use portfolios and knows how to deliver real value whether it's through smart leasing, strategic planning, or building high-performing sales and marketing teams.",
      linkedinUrl: '#',
      instagramUrl: '#',
    },
    {
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop',
      name: 'Robert Woolley',
      role: 'Founder Director',
      description: "Matthew is a seasoned commercial property expert with deep experience across asset management, investment strategy, and business operations. He's led large, mixed-use portfolios and knows how to deliver real value whether it's through smart leasing, strategic planning, or building high-performing sales and marketing teams.",
      linkedinUrl: '#',
      instagramUrl: '#',
    },
  ];

  return (
    <div className="bg-white w-full mx-auto mt-8 sm:mt-10 lg:mt-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 mb-8">
      <div>
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Leadership Team</h1>
          <p className="text-gray-[#25292C] text-base leading-relaxed max-w-3xl">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LeadershipTeam;