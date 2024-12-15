import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from './Home'

function Layout() {

  return (
    <div>
      <Home/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout