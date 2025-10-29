import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedLayout, PublicLayout, SettingsLayout } from './components'
import { LandingPage } from './pages'

const router = createBrowserRouter([
  {
    element: <PublicLayout/>,
    children:[
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/auth-redirect",
        element: {/*redirect page*/}
      },
      {
        path: "/login",
        element: {/*login page*/}
      },
      {
        path: "/register",
        element: {/*register page*/}
      },
      {
        path: "*",
        element: {/*404 page*/}
      },
    ]
  },
  {
    element: <ProtectedLayout/>,
    children: [
      {
        path: '/dashboard',
        element: {/* Dashboard page*/}
      },
      {
        path: '/task',
        element: {/* Task page*/}
      },
      {
        path: '/rewards',
        element: {/* Rewards page*/}
      },
      {
        element: <SettingsLayout/>,
        children:[
          {
            path: '/settings/account',
            element: {/*Account Info page */}
          },
          {
            path: '/settings/password',
            element: {/**Change Password Page */}
          },
          {
            path: '/settings/history',
            element: {/**Points History Page */}
          },
        ]
      }
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
