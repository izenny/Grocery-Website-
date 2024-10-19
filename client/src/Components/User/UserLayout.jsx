import React from 'react'
import Navbar from './Navbar'
import Footer from '../../Common/Footer'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <main className=" w-full h-full ">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default UserLayout