import React from 'react';
import SecurityInformation from './SecurityInformation'
import AccountActions from './AccountActions'

interface SecuritySettingsProps {
  role?: 'broker' | 'vendor';
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ role = 'broker' }) => {
  return (
    <div>
      <SecurityInformation role={role} />
      <div className='mt-6'>
        <AccountActions role={role} />
      </div>
    </div>
  )
}

export default SecuritySettings