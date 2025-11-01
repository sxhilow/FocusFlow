import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedLayout, PublicLayout, SettingsLayout } from './components'
import { AddTask, AuthRedirect, Dashboard, LandingPage, Login, PageNotFound, Register, Rewards } from './pages'
import ProtectedRoutes from './utils/ProtectedRoutes'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    element: <PublicLayout/>,
    children:[
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/auth-redirect",
        element: <AuthRedirect/>
      },
      {
        path: "*",
        element: <PageNotFound/>
      },
    ]
  },
  {
    element: <ProtectedRoutes/>,
    children: [
      {
        element: <ProtectedLayout/>,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard/>
          },
          {
            path: '/task',
            element: <AddTask/>
          },
          {
            path: '/rewards',
            element: <Rewards/>
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
