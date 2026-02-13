import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import {Navigate, Route, Routes} from "react-router"
const App = () => {
  return (
     <header>
         <SignedIn>
        <Routes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/auth" element = {<Navigate to = {"/"} replace/>} />



        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path = "/auth" element = {<AuthPage/>} />
          <Route path = "*" element = {<Navigate to = {"/auth"} replace/>} />
          </Routes>
      </SignedOut>
      {/* Show the user button when the user is signed in */}
   
    </header>
  )
}

export default App

