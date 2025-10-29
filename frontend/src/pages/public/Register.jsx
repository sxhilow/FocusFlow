import React, { useState } from 'react'
import {Google, Logo} from "../../assets"
import { Button, FormField } from '../../components'
import { googleLogin, loginUser, registerUser } from '../../controllers/auth'
import { useNavigate } from 'react-router-dom'



const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await registerUser(formData)
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.msg || "Internal Server Error")
      console.error("Login Error:", error.response?.data || error.message);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen'>

      {/** Form Container */}
      <div className='flex flex-col justify-center items-center flex-1 gap-2 px-8'>
      
        <div>
           <img src={Logo} alt="" />
        </div>
        
        <div className='bg-neutral-white md:px-16 px-4 py-8 md:py-10 w-full rounded-xl shadow-sm'>

          <div className='mb-10'>
            <h1 className='text-center text-desktop-h5 font-medium'>Join the Flow</h1>
            <p className='text-center text-neutral-600'>Create your free account and make productivity fun.</p>
          </div>

          {
            error && (
                <div className='bg-red-400/40 rounded-lg  text-red-700 p-2 text-center my-2'>
                    { error }
                </div>
            )
          }



          <form onSubmit={handleRegister}>

            <FormField 
            value={formData.name}
            label={"Name"} labelClassName='text-neutral-black'
            inputClassName={'bg-white border-none'}
            required
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            />

            <FormField 
            value={formData.email}
            label={"Email"} labelClassName='text-neutral-black'
            inputClassName={'bg-white border-none'}
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            />

            <FormField 
            value={formData.password}
            label={"Password"} 
            type={"password"}
            labelClassName='text-neutral-black'
            inputClassName={'bg-white border-none'}
            required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            <Button  
              type={"submit"}
              className="flex w-full mt-2 justify-center items-center gap-1 bg-gradient-to-br to-secondary-blue from-primary-blue hover:to-primary-blue hover:from-secondary-blue rounded-lg duration-300 transition-colors px-5 py-3 group"
            >
              <span className=' text-bg'>
                {loading ? "Loading..." : "Sign Up & Get Started"}
              </span>
            
            </Button>

          </form>

          <div className='my-5'>
            <p className='text-center text-neutral-600'>OR</p>

            <Button
            onClick={googleLogin}
            className='flex w-full mt-5 justify-center items-center gap-8 border rounded-full'>
              <img src={Google} alt="google" />
              <span>Continue with Google</span>
            </Button>
          </div>

          <div className='text-center flex flex-col'>
            <span>
              
              Already have an account? <Button to={'/register'} className='text-primary-blue'>
                Login
              </Button>

            </span>

          </div>
        </div>
      </div>


      {/** Quote Container */}
      <div className='hidden lg:flex-1 bg-primary-blue lg:flex justify-center items-center px-16'>

        <span className='text-center text-desktop-h3 font-secondary text-white'>
          “Plan smarter, block distractions, and level up your study sessions with FocusFlow.”
        </span>

      </div>
    </div>
  )
}

export default Register