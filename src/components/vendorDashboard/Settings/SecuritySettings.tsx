
import SecurityInformation from './SecurityInformation'
import AccountActions from './AccountActions'

const SecuritySettings = () => {
  return (
    <div>
        <SecurityInformation/>
        <div className='mt-6'>
            <AccountActions/>
        </div>
    </div>
  )
}

export default SecuritySettings