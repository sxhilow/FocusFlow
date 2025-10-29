import React from 'react'
import { Logo } from '../../assets'
import { Button } from '..'
import { Right } from '../../assets'

const Header = () => {
  return (
    <header className='broder border-b border-dark px-5 lg:px-44 md:px-12 py-5'>
      <nav className='flex justify-between items-center'>

        <img src={Logo} alt="Logo" className='w-24'/>

        <div className='flex justify-center items-center gap-2'>

          <Button  
              to={'/login'}
              className=""
            >
                  <span className=' text-primary-yellow font-medium'>Login</span>
                 
            </Button>

            <Button  
              to={'/register'}
              className="flex justify-center items-center gap-1 bg-gradient-to-br to-secondary-blue from-primary-blue hover:to-primary-blue hover:from-secondary-blue rounded-full duration-300 transition-colors px-5 py-3 group"
            >
                  <span className=' text-bg'>Get Started</span>
                  <img src={Right} alt='Arrow' className='group-hover:translate-x-1 transform transition'/>
            </Button>
        </div>
        
      </nav>
    </header>
  )
}

export default Header