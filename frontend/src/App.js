import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectCard from "./components/ProjectCard";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import BlogPage from "./pages/BlogPage";
import BlogDetail from './pages/BlogDetail';

function App() {

  document.oncontextmenu=()=>{
    alert("Inspect Feature is desabled")
    return false
  }
  return (
    <>
      {/* You can put your Navbar here if needed */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Blog" element={< BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </>
  );
}

export default App;