// // import "./App.css";
// // import { Route, Routes } from "react-router-dom";
// // import Home from "./components/Home";
// // import { AuthProvider } from "./context/AuthContext";

// // function App() {
// //   return (
// //     // <h1> hey its a portfolio website</h1>
// //     <AuthProvider>
// //       <div className="App">
// //         {/* <Navbar /> */}
// //         <Routes>
// //           <Route path="/Home" element={<Home />} />
// //         </Routes>
// //       </div>
// //     </AuthProvider>
// //   );
// // }

// // export default App;
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// // import About from './pages/About';

// function App() {
//   return (

//     <BrowserRouter>

//       <Routes>
//         <h1> hey </h1>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/about" element={<About />} /> */}
//         {/* Add more routes here */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectCard from "./pages/ProjectCard";
import ProjectDetailPage from "./components/ProjectDetailPage";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectCard />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
