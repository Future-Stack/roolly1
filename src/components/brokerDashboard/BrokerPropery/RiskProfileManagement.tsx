import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

interface RiskCardProps {
    icon: 'warning' | 'shield';
    title: string;
    riskLevel?: string;
    description: string;
    considerations?: string;
    tags?: string[];
}

const RiskCard: React.FC<RiskCardProps> = ({
    icon,
    title,
    riskLevel,
    description,
    considerations,
    tags,
}) => {
    const isWarning = icon === 'warning';

    return (
        <div
            className={`rounded-lg border ${isWarning
                ? 'bg-orange-50 border-orange-200'
                : 'bg-white border-gray-200'
                } mb-4`}
        >
            {/* Header */}
            <div className="px-5 py-4 flex items-start justify-between">
                <div className="flex items-start gap-2">
                    {isWarning ? (
                        <AlertTriangle
                            size={20}
                            className="text-orange-700 flex-shrink-0 mt-0.5"
                            strokeWidth={2}
                        />
                    ) : (
                        <Shield
                            size={20}
                            className="text-blue-600 flex-shrink-0 mt-0.5"
                            strokeWidth={2}
                        />
                    )}
                    <h3
                        className={`text-xl font-semibold ${isWarning ? 'text-orange-800' : 'text-gray-900'
                            }`}
                    >
                        {title}
                    </h3>
                </div>
                {riskLevel && (
                    <span className="px-3.5 py-1.5 bg-[#F97316] text-white text-[12px] font-medium rounded">
                        {riskLevel}
                    </span>
                )}
            </div>

            {/* Description */}
            <div className="px-5 pb-4">
                <p
                    className={`text-base leading-relaxed ${isWarning ? 'text-[#BB4D00]' : 'text-gray-700'
                        }`}
                >
                    {description}
                </p>
            </div>

            {/* Considerations */}
            {considerations && (
                <div className="mx-5 mb-4 bg-white rounded-md border border-orange-200 px-4 py-3">
                    <p className="text-base text-orange-800">
                        <span className="font-semibold">Considerations:</span>{' '}
                        {considerations}
                    </p>
                </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
                <div className="px-5 pb-4">
                    <div className="flex flex-col gap-2">
                        {tags.map((tag, index) => (
                            <div key={index} className="inline-block">
                                <button
                                    className="inline-flex px-4 py-3 bg-[#ECEDEE] text-gray-700 text-md font-medium rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    {tag}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const RiskProfileManagement: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Page Title */}
            <div>
                <h1 className="text-[20px] font-semibold text-gray-900">
                    Risk Profile Management
                </h1>
            </div>

            {/* Content */}
            <div className='mt-5'>
                <div>
                    {/* Warning Card */}
                    <RiskCard
                        icon="warning"
                        title="Profits Equivalent to Rent (with Rent Deposit)"
                        riskLevel="Medium Risk"
                        description="Companies where annual profits approximately equal the annual rent. Requires standard deposit (3-6 months rent) and regular financial monitoring."
                        considerations="Limited financial buffer, cashflow monitoring needed, standard vetting required"
                    />

                    {/* Restricted Uses Card */}
                    <RiskCard
                        icon="shield"
                        title="Restricted or Unauthorised Uses"
                        description=""
                        tags={['Commercial Use', 'Short-Term Rentals / Airbnb']}
                    />
                </div>
            </div>
        </div>
    );
};

export default RiskProfileManagement;