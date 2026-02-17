import React, { useState } from 'react';
import PrivacyPolicyList from './PrivacyPolicyList';
import PrivacyPolicyForm from './PrivacyPolicyForm';

const PrivacyPolicy: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const handleEdit = (item: any) => {
        setSelectedItemId(item.id);
        setView('form');
    };

    const handleAddNew = () => {
        setSelectedItemId(null);
        setView('form');
    };

    const handleSave = () => {
        // Here you would save the data
        setView('list');
        setSelectedItemId(null);
    };

    const handleCancel = () => {
        setView('list');
        setSelectedItemId(null);
    };

    return (
        <>
            {view === 'list' ? (
                <PrivacyPolicyList onEdit={handleEdit} onAddNew={handleAddNew} />
            ) : (
                <PrivacyPolicyForm
                    onCancel={handleCancel}
                    onSave={handleSave}
                    policyId={selectedItemId}
                />
            )}
        </>
    );
};

export default PrivacyPolicy;
