import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
      if(!token){
        navigate('/login')        
      }
    }, [navigate, token])

  return(

    token ? <Outlet/> : null

  ) 
  
}

export default ProtectedRoutes