import React from 'react';

interface ChoiceButtonsProps {
    options: string[];
    onSelect: (opt: string) => void;
}

const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({ options, onSelect }) => (
    <div className="flex flex-wrap gap-2 mt-2">
        {options.map((opt, i) => (
            <button
                key={i}
                onClick={() => onSelect(opt)}
                className="px-4 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm"
            >
                {opt}
            </button>
        ))}
    </div>
);

export default ChoiceButtons;
