import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSinglePropertyQuery } from '@/redux/features/vendor/getSinglePropertyApi';
import RiskProfileManagementForm from './RiskProfileManagementForm';

const RiskProfileInformation: React.FC = () => {
    const { id } = useParams();
    const { data: propertyData, isLoading, isError } = useGetSinglePropertyQuery(id!);

    const [restrictions, setRestrictions] = useState({
        vehicleRepairUse: false,
        vehicleSaleUse: false,
        subletting: false,
        leisureUse: false,
        petBusinessUse: false,
        plasticRecyclingUse: false,
        floorPlans: false,
        otherRestrictions: ''
    });

    useEffect(() => {
        if (propertyData) {
            setRestrictions({
                vehicleRepairUse: propertyData.vehicle_repair_use || false,
                vehicleSaleUse: propertyData.vehicle_sale_use || false,
                subletting: propertyData.subletting || false,
                leisureUse: propertyData.leisure_use || false,
                petBusinessUse: propertyData.pet_business_use || false,
                plasticRecyclingUse: propertyData.plastic_recycling_use || false,
                floorPlans: propertyData.floor_plans || false,
                otherRestrictions: propertyData.other_restrictions || ''
            });
        }
    }, [propertyData]);

    const handleRestrictionChange = (name: string, value: boolean) => {
        // Map backend field names (snake_case) back to local state names (camelCase) if necessary
        // However, the form component uses specific IDs that map to backend names.
        // Let's keep it simple and update based on the ID passed from the form.

        const camelCaseMap: { [key: string]: string } = {
            'vehicle_repair_use': 'vehicleRepairUse',
            'vehicle_sale_use': 'vehicleSaleUse',
            'subletting': 'subletting',
            'pet_business_use': 'petBusinessUse',
            'leisure_use': 'leisureUse',
            'plastic_recycling_use': 'plasticRecyclingUse',
            'floor_plans': 'floorPlans'
        };

        const stateName = camelCaseMap[name] || name;

        setRestrictions(prev => ({
            ...prev,
            [stateName]: value
        }));
    };

    const handleOtherRestrictionsChange = (value: string) => {
        setRestrictions(prev => ({
            ...prev,
            otherRestrictions: value
        }));
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-gray-500">Loading risk profile...</div>
            </div>
        );
    }

    if (isError || !propertyData) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <div className="text-red-500">Error loading property information.</div>
            </div>
        );
    }

    return (
        <RiskProfileManagementForm
            vehicleRepairUse={restrictions.vehicleRepairUse}
            vehicleSaleUse={restrictions.vehicleSaleUse}
            subletting={restrictions.subletting}
            leisureUse={restrictions.leisureUse}
            petBusinessUse={restrictions.petBusinessUse}
            plasticRecyclingUse={restrictions.plasticRecyclingUse}
            floorPlans={restrictions.floorPlans}
            otherRestrictions={restrictions.otherRestrictions}
            onRestrictionChange={handleRestrictionChange}
            onOtherRestrictionsChange={handleOtherRestrictionsChange}
        />
    );
};

export default RiskProfileInformation;
