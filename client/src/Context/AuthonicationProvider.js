import React, { useState } from 'react'
import AuthContext from './AuthonicationContext'

const AuthonicationProvider = (props) => {
    const [authToken, setauthToken] = useState('');

  return (
    <AuthContext.Provider value={{authToken,setauthToken}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthonicationProvider
