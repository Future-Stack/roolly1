import React, { type ReactNode } from "react";

interface CommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 sm:px-6 py-2 rounded-[20px] font-medium transition bg-sunset-orange text-lg text-white cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
