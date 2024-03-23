import React from 'react'
import UserNavbar from '../components/User/UserNavbar'
const UserLayout = ({children}) => {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  )
}

export default UserLayout
