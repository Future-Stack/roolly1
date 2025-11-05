import React, { type ReactNode } from "react";

interface CommonHeaderProps {
  children: ReactNode;
  className?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ children, className }) => {
  return (
    <h2
      className={`text-base lg:text-xl text-jet-black font-medium ${className}`}
    >
      {children}
    </h2>
  );
};

export default CommonHeader;
