
interface StatusCardProps {
  count: number;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  isSelected?: boolean; // ✅ NEW: Selection state
}

const StatusCard: React.FC<StatusCardProps> = ({
  count,
  label,
  bgColor,
  textColor,
  borderColor,
  isSelected = false // ✅ Default: selected
}) => {

  return (
    <div
      className={`relative flex-1 border rounded-2xl py-6 px-6 flex flex-col items-center justify-center transition-all ${isSelected
          ? `${bgColor} ${borderColor} shadow-sm hover:shadow-md`
          : `border-transparent ${bgColor}`
        }`}
    >
      {/* ✅ Checkbox indicator (top-right corner) */}
      <div className="absolute top-3 right-3">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected
              ? `${borderColor} ${bgColor}`
              : 'border-gray-200 bg-white'
            }`}
        >
          {isSelected && (
            <svg
              className={`w-3.5 h-3.5 ${textColor}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
      </div>

      {/* Count and Label */}
      <div className={`text-[40px] font-bold ${textColor} leading-none mb-2`}>
        {count}
      </div>
      <div className={`text-[15px] font-normal ${textColor}`}>
        {label}
      </div>
    </div>
  );
};

export default StatusCard;




// interface StatusCardProps {
//   count: number;
//   label: string;
//   bgColor: string;
//   textColor: string;
//   borderColor: string;
// }

// const StatusCard: React.FC<StatusCardProps> = ({ count, label, bgColor, textColor, borderColor }) => {
//   return (
//     <div className={`flex-1 ${bgColor} ${borderColor} border rounded-2xl py-6 px-6 flex flex-col items-center justify-center`}>
//       <div className={`text-[40px] font-bold ${textColor} leading-none mb-2`}>
//         {count}
//       </div>
//       <div className={`text-[15px] font-normal ${textColor}`}>
//         {label}
//       </div>
//     </div>
//   );
// };

// export default StatusCard;