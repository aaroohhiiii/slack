import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import {Navigate, Route, Routes} from "react-router"

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {


  return (
     <header>
         <SignedIn>
        <SentryRoutes>
          <Route path = "/" element = {<HomePage/>} />
          <Route path = "/auth" element = {<Navigate to = {"/"} replace/>} />



        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path = "/auth" element = {<AuthPage/>} />
          <Route path = "*" element = {<Navigate to = {"/auth"} replace/>} />
          </SentryRoutes>
      </SignedOut>
      {/* Show the user button when the user is signed in */}
   
    </header>
  )
}

export default App

