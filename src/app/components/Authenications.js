"use client"

import Auth from "../authProvider"


function AuthProvider({ children }) {
  return (
    <Auth>
      {children}
    </Auth>
  )
}

export default AuthProvider