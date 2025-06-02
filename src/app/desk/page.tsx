import React from 'react'
import MainContent from './MainContent'
import Header from '@/components/mainUi/Header'

function page() {
  return (
      <div className='w-full min-h-screen bg-neutral-900 relative'>
          <Header show={false} />
          <MainContent />
      </div>
  )
}

export default page