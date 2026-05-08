import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Header from "./assets/partials/Header"
import Footer from "./assets/partials/Footer"
import Home from './assets/Pages/Home'
import AddBlog from './assets/Admin/AddBlog'

function Label(){
  return(
    <>
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route element={<Label />}>
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <Routes>
        <Route path='/admin/addblog' element={<AddBlog />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
