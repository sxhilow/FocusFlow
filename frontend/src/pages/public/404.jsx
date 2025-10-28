import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (

    <div className='w-full h-screen flex flex-col justify-center items-center text-center'>
      <h2 className='text-desktop-h3 font-bold mb-4'>404</h2>
      <p className='text-neutral-10 mb-6 text-desktop-h4'>The page you're looking for dosen't exists</p>
      <Link
        to='/projects'
        className='px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition'
      >
        Back to Projects
      </Link>
    </div>
      
  )
}

export default PageNotFound