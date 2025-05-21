import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectCard from "./components/ProjectCard";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectCard />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
