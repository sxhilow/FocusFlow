import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUI } from '../../context/UIContext'
import { useUser } from '../../context/UserContext'

const AuthRedirect = () => {

    const {authModal, setAuthModal} = useUI()
    const {user, userLoading} = useUser()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if(token){
            localStorage.setItem("token", token)
        }else{
            setAuthModal('login')
            navigate('/')
        }

        if(!userLoading){
          if(!user?.is_profile_complete){
            navigate('/complete-profile')
          }else{
            navigate('/projects')
          }
        }
    }, [location, navigate, user, userLoading])

  return (
    <div className='w-full h-screen flex justify-center items-center text-desktop-h2 font-bold'>Processing Login...</div>
  )
}

export default AuthRedirect