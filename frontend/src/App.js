// import React, { useEffect, useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Home from "./pages/Home";
// import ProjectCard from "./components/ProjectCard";
// import ProjectDetailPage from "./pages/ProjectDetailPage";
// import About from "./pages/About";
// import Admin from "./pages/Admin";
// import Dashboard from "./pages/Dashboard";
// import ContactPage from "./pages/ContactPage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { getMe, logout } from "./utils/auth";

// // Optional: You may want to use a context/provider for user state in a larger app

// function App() {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const navigate = useNavigate();

//   // On mount, check if user is authenticated
//   useEffect(() => {
//     getMe()
//       .then(setUser)
//       .catch(() => setUser(null))
//       .finally(() => setAuthLoading(false));
//   }, []);

//   // Helper for protected routes
//   const RequireAuth = ({ children }) => {
//     if (authLoading) return <div>Loading...</div>;
//     if (!user) return <Navigate to="/login" replace />;
//     return children;
//   };

//   const handleLogout = async () => {
//     await logout();
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* You can put your Navbar here and pass user/handleLogout if needed */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/projects" element={<ProjectCard />} />
//         <Route path="/projects/:id" element={<ProjectDetailPage />} />
//         <Route path="/about" element={<About />} />
//         <Route
//           path="/admin"
//           element={
//             <RequireAuth>
//               <Admin user={user} onLogout={handleLogout} />
//             </RequireAuth>
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             <RequireAuth>
//               <Dashboard user={user} onLogout={handleLogout} />
//             </RequireAuth>
//           }
//         />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route
//           path="/login"
//           element={
//             user ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Login onLogin={setUser} />
//             )
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             user ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Register />
//             )
//           }
//         />
//         {/* 404 Route */}
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default App;




import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import ProjectCard from "./components/ProjectCard";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/authcontext"; // Use the context

function App() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const RequireAuth = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {/* Navbar can go here and receive user & handleLogout */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin user={user} onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard user={user} onLogout={handleLogout} />
            </RequireAuth>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
