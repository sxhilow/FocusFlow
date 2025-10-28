import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const PublicLayout = () => {

  return (
    <div className={`relative h-screen bg-gradient-to-b from-purple-50 to-orange-100`}>      
      
        <Header />

        <main>
            <Outlet/>
        </main>

    </div>
  )
}

export default PublicLayout