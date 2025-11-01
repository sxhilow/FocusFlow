import React, { useEffect, useState } from 'react'
import { Logo } from '../../assets'
import { NavLink, useNavigate} from "react-router-dom"
import {Button} from "../"
import { 
    Layers,
    Logout,
    Gamepad,
    Rocket,
    Settings,
    Columns
} from "../../assets/"

const SideBar = ({ isopen, toggleSidebar, isMobile}) => {

    const navigate = useNavigate()

    const handleNavClick = () => {
        toggleSidebar()
    }

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

  return (
    <div className={`w-full md:max-w-3xs border-primary-blue bg-washed-blue min-h-screen flex flex-col justify-between fixed top-0 left-0 z-50 overflow-hidden transition-transform ${isMobile && isopen ? '-translate-x-full' : '-translate-x-0'} duration-150 shadow-md`}>

        <div>

            <div className='flex items-center justify-between p-2'>
                <div className='flex items-center gap-2'>
                    <img src={Logo} alt="FocusFlow" className='w-32'/>
                </div>
                <Button className={`${!isMobile ? "hidden" : "block"} cursor-pointer`} onClick={toggleSidebar}>
                    <img src={Columns} alt="Column" className='w-8'/>
                </Button>
            </div>

        
            {/* 
                Make this clean by moving navitems to constant
            */}

            <div className='mt-2 p-2'>
                <h2 className='text-xs font-medium text-neutral-500 mb-2 uppercase '>General</h2>

                <ul className='text-neutral-8 p-2 md:p-0 font-medium text-desktop-p'>
                    
                    <NavLink to={'/dashboard'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-blue-50" : "hover:bg-blue-50"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Layers} alt="Box" />
                                <span>Dashboard</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={'/task'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-blue-50" : "hover:bg-blue-50"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Rocket} alt="Box" />
                                <span>Tasks</span>                  
                            </li>
                        )}
                    </NavLink> 

                    <NavLink to={'/rewards'} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-blue-50" : "hover:bg-blue-50"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Gamepad} alt="Box" />
                                <span>Rewards</span>                  
                            </li>
                        )}
                    </NavLink> 
                </ul>
            </div>
        </div>

        <div>
            <div className='mt-2 p-2'>

                <ul className='text-neutral-8 p-2 md:p-0 font-medium text-desktop-p'>

                    <NavLink to={`/settings/account`} onClick={handleNavClick}> 
                        {({isActive}) => (
                            <li className={`${isActive ? "bg-blue-50" : "hover:bg-blue-50"} w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Settings} alt="Settings" />
                                <span>Setting</span>                  
                            </li>
                        )}
                    </NavLink> 
                     

                    <NavLink onClick={handleLogOut}> 
                            <li className={` hover:bg-blue-50 w-full cursor-pointer transition duration-200 p-1 rounded-lg flex items-center gap-2 my-1`}>
                                <img src={Logout} alt="Box" />
                                <span>Logout</span>                  
                            </li>                    
                    </NavLink> 

                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar