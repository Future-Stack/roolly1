import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // update path if needed
import { ChevronDown } from "lucide-react";

// generic SelectOption interface
interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface SelectProps<T extends string> {
  value: T;
  item: readonly SelectOption<T>[];
  w?: number;
  onValueChange: (val: T) => void;
  className?: string;
  arrow?: string;
}

const CommonSelect = <T extends string>({
  value,
  item,
  w = 200,
  onValueChange,
  className,
  arrow,
}: SelectProps<T>) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        style={{ minWidth: w }}
        className={` ${className} bg-[#FCFCFC] border border-[#B3B3B3] px-3 py-5 cursor-pointer rounded-md outline-none text-sm focus:ring-0 focus:border-none hover:border-gray-400 transition-all duration-200`}
      >
        <SelectValue placeholder="Select an option" />
        <ChevronDown className={`w-4 h-4 ml-auto ${arrow}`} />
      </SelectTrigger>

      <SelectContent className="bg-white border border-[#B3B3B3] rounded-md shadow-md">
        {item.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 transition-colors rounded"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CommonSelect;
