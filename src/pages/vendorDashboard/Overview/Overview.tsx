import FilteredLeadsTable from '@/components/vendorDashboard/Overview/FilteredLeadsTable'
import LeadPropertyStats from '@/components/vendorDashboard/Overview/LeadPropertyStats'
import LeadStatusDistribution from '@/components/vendorDashboard/Overview/LeadStatusDistribution'
import RecentActivity from '@/components/vendorDashboard/Overview/RecentActivity'
import RecentLeads from '@/components/vendorDashboard/Overview/RecentLeads'
import StatsCards from '@/components/vendorDashboard/Overview/StatsCards'
import { useState } from 'react'

const Overview = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleFilterChange = (selectedStatuses: string[]) => {
    setActiveFilters(selectedStatuses)
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-4xl font-bold'>Dashboard Overview</h1>
        <p className='mt-4 text-lg'>Welcome back! Here's what's happening with your platform today.</p>
      </div>
      <StatsCards />
      <LeadStatusDistribution onFilterChange={handleFilterChange} />

      {activeFilters.length > 0 && (
        <FilteredLeadsTable selectedFilters={activeFilters} />
      )}
      <LeadPropertyStats />
      <RecentLeads />
      <RecentActivity />
    </div>
  )
}

export default Overview