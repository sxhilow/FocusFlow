import React from 'react'
import { NavLink } from 'react-router-dom'

const SettingsNavItems = () => {
  return (
    <div className='px-5 lg:px-10 py-5 flex flex-col w-full'>
        <h1 className='text-desktop-h4 font-bold'>Settings</h1>

        <ul className='py-8'>
          <NavLink to={'/settings/account'} end>
            {({isActive}) => (
              <li className={`${isActive ? "bg-washed-blue/60" : "hover:bg-washed-blue/60"} bg-washed-blue p-5 rounded-xl transtition duration-200 my-4`}>
                <span   className='text-neutral-10 text-desktop-p '>Account Information</span>
              </li>
            )}
          </NavLink>

          <NavLink to={'/settings/password'}>
            {({isActive}) => (
              <li className={`${isActive ? "bg-washed-blue/60" : "hover:bg-washed-blue/60"} bg-washed-blue p-5 rounded-xl transtition duration-200 my-4`}>
                <span   className='text-neutral-10 text-desktop-p '>Change Password</span>
              </li>
            )}
          </NavLink>

          <NavLink to={'/settings/history'}>
            {({isActive}) => (
              <li className={`${isActive ? "bg-washed-blue/60" : "hover:bg-washed-blue/60"} bg-washed-blue p-5 rounded-xl transtition duration-200 my-4`}>
                <span   className='text-neutral-10 text-desktop-p '>Points History</span>
              </li>
            )}
          </NavLink>

        </ul>
    </div>
  )
}

export default SettingsNavItems