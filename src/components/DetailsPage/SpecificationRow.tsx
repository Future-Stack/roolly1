interface RowProps {
  label: string;
  value: string;
}

const SpecificationRow: React.FC<RowProps> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-gray-100">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

export default SpecificationRow;
