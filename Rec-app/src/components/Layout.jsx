import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <>
    <Sidebar/>
    <div className='my-5'>
    </div>
    <Outlet/>
    </>
  )
}
