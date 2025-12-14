interface StatusCardProps {
  count: number;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ count, label, bgColor, textColor, borderColor }) => {
  return (
    <div className={`flex-1 ${bgColor} ${borderColor} border rounded-2xl py-6 px-6 flex flex-col items-center justify-center`}>
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