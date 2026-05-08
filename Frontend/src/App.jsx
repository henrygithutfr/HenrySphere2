import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Header from "./assets/partials/Header";
import Footer from "./assets/partials/Footer";

import Home from "./assets/Pages/Home";
import AddBlog from "./assets/admin/AddBlog";
import Blog from "./assets/Pages/Blog";
import SingleBlog from "./assets/Pages/SingleBlog";

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
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
        </Route>

        <Route path="/admin/addblog" element={<AddBlog />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
