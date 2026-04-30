import React from 'react';

interface UserAvatarProps {
  image?: string;
  name?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, name, className }) => {
  const getInitials = (name?: string) => {
    if (!name) return '?';
    const names = name.trim().split(/\s+/);
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  const hasImage = image && !image.includes('unsplash.com') && image.trim() !== '';

  if (hasImage) {
    return (
      <img
        src={image}
        alt={name || 'Profile'}
        className={`${className} object-cover rounded-full`}
      />
    );
  }

  return (
    <div className={`${className} rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-medium uppercase overflow-hidden`}>
      {getInitials(name)}
    </div>
  );
};

export default UserAvatar;
