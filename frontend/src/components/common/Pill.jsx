import React from 'react'
import { Rocket } from '../../assets'

const Pill = ({text}) => {
  return (
    <div className='flex justify-center items-center gap-2 px-4 py-1 border-2 border-primary-blue rounded-full text-dark'>

        <img src={Rocket} alt='Roc'/>
        <span className='bg-gradient-to-br bg-clip-text text-transparent from-secondary-blue to-primary-red'>
          {text}
        </span>
          
    </div>
  )
}

export default Pill