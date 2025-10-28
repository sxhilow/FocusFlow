import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({to, children, className='', disabled, ...props}) => {

    if(to){
        return <Link to={to} className={`${className} text-desktop-p`}>{children}</Link>
    }

  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 rounded-lg transition-all duration-200 
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-primary-blue/10 cursor-pointer'} 
        ${className} text-desktop-p`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button