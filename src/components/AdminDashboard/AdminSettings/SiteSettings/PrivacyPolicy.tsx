import React, { useState } from 'react';
import PrivacyPolicyList from './PrivacyPolicyList';
import PrivacyPolicyForm from './PrivacyPolicyForm';

const PrivacyPolicy: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setView('form');
    };

    const handleSave = () => {
        // Here you would save the data
        setView('list');
        setSelectedItem(null);
    };

    const handleCancel = () => {
        setView('list');
        setSelectedItem(null);
    };

    return (
        <>
            {view === 'list' ? (
                <PrivacyPolicyList onEdit={handleEdit} />
            ) : (
                <PrivacyPolicyForm
                    onCancel={handleCancel}
                    onSave={handleSave}
                    initialData={selectedItem}
                />
            )}
        </>
    );
};

export default PrivacyPolicy;
