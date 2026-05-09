import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./assets/partials/Header";
import Footer from "./assets/partials/Footer";

import Home from "./assets/Pages/Home";
import Blog from "./assets/Pages/Blog";
import SingleBlog from "./assets/Pages/SingleBlog";

import AddBlog from "./assets/admin/AddBlog";
import UpdateBlog from "./assets/admin/UpdateBlog";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<SingleBlog />} />
          </Route>

          <Route path="/admin/addblog" element={<AddBlog />} />
          <Route path="/admin/updateblog/:slug" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
