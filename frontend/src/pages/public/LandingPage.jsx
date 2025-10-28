import React from 'react'
import { Button, Pill } from '../../components'
import { HeroImage, Right } from '../../assets'

const LandingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center py-20 space-y-5'>

      <div>
          <Pill text={"Gamified Time-Blocking"}/>
      </div>

      <div className='space-y-2'>
        <div className="text-center text-desktop-h1 leading-none font-bold bg-blue-red-blue bg-clip-text text-transparent">
          Time Blocking <br />
          That Actually Sticks
        </div>
        <div className='text-center text-neutral-black text-lg'>
          FocusFlow helps students plan, block, and conquer their day with gamified challenges 
          <br /> that make productivity addictive.
        </div>
      </div>
      <div>
        <Button  
          to={'/register'}
          className="flex justify-center items-center gap-1 bg-gradient-to-br to-secondary-blue from-primary-blue hover:to-primary-blue hover:from-secondary-blue rounded-full duration-300 transition-colors px-5 py-3 group"
        >
              <span className=' text-bg'>Start Focusing Today</span>
              <img src={Right} alt='Arrow' className='group-hover:translate-x-1 transform transition'/>
        </Button>
      </div>

      <div className='mt-10'>
        <img src={HeroImage} className='w-4xl'/>
      </div>
    </div>
  )
}

export default LandingPage