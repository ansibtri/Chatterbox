import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import  Navbar from "../components/Navbar"
export const Route = createRootRouteWithContext()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar/>
      <Outlet />
    </React.Fragment>
  )
}
