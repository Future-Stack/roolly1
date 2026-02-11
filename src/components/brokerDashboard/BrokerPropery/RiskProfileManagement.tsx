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

interface RiskProfileManagementProps {
    vehicleRepairUse: boolean;
    vehicleSaleUse: boolean;
    subletting: boolean;
    leisureUse: boolean;
    petBusinessUse: boolean;
    plasticRecyclingUse: boolean;
    onRestrictionChange: (name: string, value: boolean) => void;
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

const RiskProfileManagement: React.FC<RiskProfileManagementProps> = ({
    vehicleRepairUse,
    vehicleSaleUse,
    subletting,
    leisureUse,
    petBusinessUse,
    plasticRecyclingUse,
    onRestrictionChange,
}) => {
    // You can now use these props in your component
    // For example, you might want to display checkboxes for each restriction
    // or use the values to conditionally render content
    
    // I'll add a simple example of how you might use these:
    const restrictedUses = [];
    
    if (vehicleRepairUse) restrictedUses.push('Vehicle Repair');
    if (vehicleSaleUse) restrictedUses.push('Vehicle Sale');
    if (subletting) restrictedUses.push('Subletting');
    if (leisureUse) restrictedUses.push('Leisure Use');
    if (petBusinessUse) restrictedUses.push('Pet Business');
    if (plasticRecyclingUse) restrictedUses.push('Plastic Recycling');

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

                    {/* Restricted Uses Card - Now showing actual restricted uses */}
                    <RiskCard
                        icon="shield"
                        title="Restricted or Unauthorised Uses"
                        description=""
                        tags={restrictedUses.length > 0 ? restrictedUses : ['No restricted uses selected']}
                    />

                    {/* Optional: Add checkboxes to toggle restrictions */}
                    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Toggle Restricted Uses
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={vehicleRepairUse}
                                    onChange={(e) => onRestrictionChange('vehicle_repair_use', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Vehicle Repair Use</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={vehicleSaleUse}
                                    onChange={(e) => onRestrictionChange('vehicle_sale_use', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Vehicle Sale Use</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={subletting}
                                    onChange={(e) => onRestrictionChange('subletting', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Subletting</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={leisureUse}
                                    onChange={(e) => onRestrictionChange('leisure_use', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Leisure Use</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={petBusinessUse}
                                    onChange={(e) => onRestrictionChange('pet_business_use', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Pet Business Use</span>
                            </label>
                            
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={plasticRecyclingUse}
                                    onChange={(e) => onRestrictionChange('plastic_recycling_use', e.target.checked)}
                                    className="rounded"
                                />
                                <span>Plastic Recycling Use</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskProfileManagement;