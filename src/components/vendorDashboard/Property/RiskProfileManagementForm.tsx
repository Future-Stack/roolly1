import { AlertTriangle, Check, Info, Shield, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface RiskProfile {
    id: string;
    checked: boolean;
}

interface Restriction {
    id: string;
    checked: boolean;
}

const RiskProfileManagementForm: React.FC = () => {
    const [riskProfiles, setRiskProfiles] = useState<RiskProfile[]>([
        { id: 'low', checked: false },
        { id: 'medium', checked: false },
        { id: 'high', checked: false }
    ]);

    const [restrictions, setRestrictions] = useState<Restriction[]>([
        { id: 'vehicleRepair', checked: false },
        { id: 'vehicleSale', checked: false },
        { id: 'subletting', checked: false },
        { id: 'petBusiness', checked: false },
        { id: 'leisure', checked: false },
        { id: 'plasticRecycling', checked: false }
    ]);

    const toggleRiskProfile = (id: string) => {
        setRiskProfiles(prev =>
            prev.map(profile =>
                profile.id === id ? { ...profile, checked: !profile.checked } : profile
            )
        );
    };

    const toggleRestriction = (id: string) => {
        setRestrictions(prev =>
            prev.map(restriction =>
                restriction.id === id ? { ...restriction, checked: !restriction.checked } : restriction
            )
        );
    };

    return (
        <div className="w-full min-h-screen">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Property Information
                    </h1>
                    <p className="text-base text-gray-600">
                        Find the perfect buyer or tenant for your property — list it today!
                    </p>
                </div>

                <div className='bg-white rounded-2xl px-4 pb-6 pt-12'>
                    {/* Step Indicator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center gap-0">
                            <Link to='/vendor-dashboard/properties/1'>
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-medium">
                                    1
                                </div>
                            </Link>
                            <div className="w-20 h-0.5 bg-blue-600"></div>
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-medium">
                                2
                            </div>
                        </div>
                    </div>

                    {/* Risk Profile Management Section */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-1">
                            Risk Profile Management
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Tell us what's acceptable for this property and you'll only receive the relevant leads.
                        </p>

                        <div className="space-y-4">
                            {/* Low Risk - Green */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-5 relative">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={riskProfiles[0].checked}
                                        onChange={() => toggleRiskProfile('low')}
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Check className="w-4 h-4 text-[#00B327]" strokeWidth={2.5} />
                                            <h3 className="text-md font-semibold text-[#00B327]">
                                                Profits 3x Rent and Above
                                            </h3>
                                        </div>
                                        <p className="text-sm text-green-700 mb-3 leading-relaxed">
                                            Financially strong companies with profits at least 3 times the annual rent. Preferred tenants with strong creditworthiness and lower deposit requirements (1-3 months).
                                        </p>
                                        <div className="bg-white border border-green-200 rounded-md p-3">
                                            <p className="text-sm text-green-700">
                                                <span className="font-semibold">Benefits:</span> Strong financial position, lower default risk, reliable payment history
                                            </p>
                                        </div>
                                    </div>
                                    <span className="absolute top-5 right-5 px-2 py-1 bg-green-600 text-white text-[11px] font-semibold rounded">
                                        Low Risk
                                    </span>
                                </div>
                            </div>

                            {/* Medium Risk - Orange */}
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 relative">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={riskProfiles[1].checked}
                                        onChange={() => toggleRiskProfile('medium')}
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertTriangle className="w-4 h-4 text-orange-600" strokeWidth={2.5} />
                                            <h3 className="text-md font-semibold text-orange-800">
                                                Profits Equivalent to Rent (with Rent Deposit)
                                            </h3>
                                        </div>
                                        <p className="text-sm text-orange-800 mb-3 leading-relaxed">
                                            Companies where annual profits approximately equal the annual rent. Requires standard deposit (3–6 months rent) and regular financial monitoring.
                                        </p>
                                        <div className="bg-white border border-orange-200 rounded-md p-3">
                                            <p className="text-sm text-orange-800">
                                                <span className="font-semibold">Considerations:</span> Limited financial buffer, cashflow monitoring needed, standard vetting required
                                            </p>
                                        </div>
                                    </div>
                                    <span className="absolute top-5 right-5 px-2 py-1 bg-orange-500 text-white text-[11px] font-semibold rounded">
                                        Medium Risk
                                    </span>
                                </div>
                            </div>

                            {/* High Risk - Red */}
                            <div className="bg-red-50 border border-red-200 rounded-lg p-5 relative">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={riskProfiles[2].checked}
                                        onChange={() => toggleRiskProfile('high')}
                                        className="mt-1 w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <XCircle className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                                            <h3 className="text-md font-semibold text-red-800">
                                                New Company / No Accounts (with Rent Deposit)
                                            </h3>
                                        </div>
                                        <p className="text-sm text-red-800 mb-3 leading-relaxed">
                                            Newly established companies without trading history or accounts. Requires comprehensive vetting, guarantor support, and higher deposit (typically 6-12 months rent).
                                        </p>
                                        <div className="bg-white border border-red-200 rounded-md p-3">
                                            <p className="text-sm text-red-800">
                                                <span className="font-semibold">Risk Factors:</span> No financial track record, higher default risk, limited credit history
                                            </p>
                                        </div>
                                    </div>
                                    <span className="absolute top-5 right-5 px-2 py-1 bg-red-600 text-white text-[11px] font-semibold rounded">
                                        High Risk
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Restricted or Unauthorised Uses Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-5 h-5 text-blue-600" strokeWidth={2} />
                            <h2 className="text-lg font-bold text-gray-900">
                                Restricted or Unauthorised Uses
                            </h2>
                        </div>
                        <p className="text-md text-[#101828] mb-5 ml-7">
                            Define property use restrictions and prohibited activities
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Vehicle Repair Use */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[0].checked}
                                        onChange={() => toggleRestriction('vehicleRepair')}
                                        className="mt-0.5 w-4 h-4 rounded  border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                            Vehicle Repair Use
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Prohibit subletting for short-term holiday rentals
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Sale Use */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[1].checked}
                                        onChange={() => toggleRestriction('vehicleSale')}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                            Vehicle Sale Use
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Restrict use for business or commercial purposes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Subletting */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[2].checked}
                                        onChange={() => toggleRestriction('subletting')}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                            Subletting
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Prohibit tenant from subletting to third parties
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Pet Business Use */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[3].checked}
                                        onChange={() => toggleRestriction('petBusiness')}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                            Pet Business Use
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Restrict keeping of pets on the property
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Leisure Use */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[4].checked}
                                        onChange={() => toggleRestriction('leisure')}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">
                                            Leisure Use
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Plastic Recycling Use */}
                            <div className="bg-[#ECEDEE] border border-gray-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={restrictions[5].checked}
                                        onChange={() => toggleRestriction('plasticRecycling')}
                                        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-0.5">
                                            Plastic Recycling Use
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Prohibit use or cultivation of cannabis
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Configuration Note */}
                    <div className="bg-[#ECEDEE] border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                            <Info className="w-5 h-5 text-[#126AD8] flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <div>
                                <h3 className="text-base font-semibold text-[#126AD8] mb-1">
                                    Configuration Note:
                                </h3>
                                <p className="text-sm text-blue-800 leading-relaxed">
                                    Selected restrictions will be automatically included in tenant agreements and screening criteria. Brokers can use these settings to filter and categorize properties based on use restrictions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors">
                            Submit
                        </button>
                        <button className="text-gray-700 hover:text-gray-900 px-4 py-2.5 text-[14px] font-medium transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskProfileManagementForm;