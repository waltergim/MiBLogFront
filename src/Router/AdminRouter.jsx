import React from 'react'
import {Routes,Route} from 'react-router-dom'
import {AdminLayout } from '../layouts'
import {Auth, Users, Blog,Courses,Menu, Newslatter} from '../pages/admin'
import { useAuth } from '../hook'
 
 

export const AdminRouter = () => {
  const { user } = useAuth()

  const loadLayout = (Layout, Page) =>{
    return (
      <Layout>
        <Page/>
      </Layout>
    )
  }


  return (
    <Routes>
      {!user ? (
      <Route path='/admin/*' element={<Auth/>} />
      ):(
        <>
        {["/admin","/admin/blog"].map((path)=>{
          return   <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />
        })}

        <Route path='/admin/users' element={loadLayout(AdminLayout, Users)} />
        <Route path='/admin/courses' element={loadLayout(AdminLayout, Courses)} />
        <Route path='/admin/Menu' element={loadLayout(AdminLayout, Menu)} />
        <Route path='/admin/newslatter' element={loadLayout(AdminLayout, Newslatter)} />
        </>
      )}

      
      
    </Routes>
  )
}
