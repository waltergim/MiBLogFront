
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {AdminRouter, WebRouter} from './Router'
import {AuthProvider} from './contexts'

export const App = () => {
  return (
    <AuthProvider>
 <BrowserRouter>
 
  <AdminRouter /> 
  <WebRouter   /> 
 </BrowserRouter>
 </AuthProvider>
    
  )
}


export default App
