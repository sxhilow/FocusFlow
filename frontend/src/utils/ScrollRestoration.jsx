import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollRestoration = () => {
    const location = useLocation()

  return (
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
  )
}

export default ScrollRestoration