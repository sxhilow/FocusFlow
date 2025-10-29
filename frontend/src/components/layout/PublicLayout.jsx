import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const PublicLayout = () => {

  return (
    <div className={`relative bg-hero`}>      
      
        <Header />

        <main>
            <Outlet/>
        </main>

    </div>
  )
}

export default PublicLayout