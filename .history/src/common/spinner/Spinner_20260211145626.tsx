import React from 'react';

type SpinnerProps = {
  size?: number | string;
  thickness?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  thickness = 3,
  color = '#2563EB',
  className = '',
  'aria-label': ariaLabel = 'Loading',
}) => {
  const s = typeof size === 'number' ? `${size}px` : size;
  const stroke = thickness;

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={className}
      style={{ display: 'inline-block', width: s, height: s }}
    >
      <style>{`
        .copilot-spinner { display:inline-block; animation: copilot-spin 1s linear infinite; transform-origin: center; }
        @keyframes copilot-spin { 100% { transform: rotate(360deg); } }
      `}</style>

      <svg
        className="copilot-spinner"
        width={s}
        height={s}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={stroke} opacity="0.2" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </span>
  );
};

export default Spinner;
