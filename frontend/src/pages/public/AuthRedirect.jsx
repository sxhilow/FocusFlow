import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthRedirect = () => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if(token){
            localStorage.setItem("token", token)
            navigate('/dashboard')
        }else{
            navigate('/login')
        }

    }, [location, navigate])

  return (
    <div className='w-full h-screen flex justify-center items-center text-desktop-h2 font-bold'>Processing Login...</div>
  )
}

export default AuthRedirect