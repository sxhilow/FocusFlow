import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import MobileNavbar from './MobileNavbar'
import SideBar from './SideBar'
import ScrollRestoration from '../../utils/ScrollRestoration'

const ProtectedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768
      setIsMobile(isNowMobile)

      if(!isNowMobile){
        isSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  const toggleSidebar = () => {
    if(isMobile){
      setIsSidebarOpen(prev => !prev)
    }
  }

  return (
    <div className='min-h-screen '>
      
        <ScrollRestoration/>

        {/* Sidebar.jsx*/}
          
        <div className='lg:flex '>
        

          <SideBar 
            className={`${isMobile && !isSidebarOpen ? "hidden" : "block"}`}
            isopen={isSidebarOpen}  toggleSidebar={toggleSidebar} isMobile={isMobile}/>

          <div className='flex-col w-full'>

            { 
              isMobile && (
                <MobileNavbar toggleSidebar={toggleSidebar}/>
              )
            }

            <main className={`flex-1 flex-grow overflow-auto ${isSidebarOpen ? "md:pl-64" : "pl-0"} ${isMobile ? '' : ''}`}>
              <Outlet context={{isMobile}}/>
            </main>

          </div>

        </div>

    </div>
  )
}

export default ProtectedLayout