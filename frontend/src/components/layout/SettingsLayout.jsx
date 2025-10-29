import React from 'react'
import {Outlet} from 'react-router-dom'
import SettingsNavItems from './SettingsNavItems'

const SettingsLayout = () => {
  return (
    <div className='flex max-md:flex-col min-h-screen'>
      
      <div className='flex-1'>
        <SettingsNavItems/>
      </div>

      <div className='flex-1 border-t lg:border-l border-primary-blue'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default SettingsLayout