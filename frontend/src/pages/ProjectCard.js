// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// // // const ProjectCard = () => {
// // //   const [projects, setProjects] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetch(`${API_BASE_URL}/projects`)
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         setProjects(data);
// // //         setLoading(false);
// // //       })
// // //       .catch(() => setLoading(false));
// // //   }, []);

// // //   if (loading) return <div>Loading projects...</div>;

// // //   return (
// // //     <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
// // //       {projects.map(project => (
// // //         <div
// // //           key={project.id}
// // //           style={{
// // //             border: "1px solid #ddd",
// // //             borderRadius: 8,
// // //             width: 300,
// // //             cursor: "pointer",
// // //             padding: 16,
// // //             background: "#fff",
// // //             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
// // //           }}
// // //           onClick={() => navigate(`/projects/${project.id}`)}
// // //         >
// // //           {project.mediaType === "image" ? (
// // //             <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
// // //           ) : (
// // //             <video src={project.mediaUrl} controls style={{ width: "100%", height: 180, borderRadius: 6 }} />
// // //           )}
// // //           <h3 style={{ margin: "1rem 0 0.5rem" }}>{project.title}</h3>
// // //           <p style={{ color: "#555" }}>{project.description.slice(0, 80)}...</p>
// // //           <div style={{ margin: "0.5rem 0" }}>
// // //             <strong>Tech:</strong> {project.techStack.join(", ")}
// // //           </div>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // };

// // // export default ProjectCard;
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// // const ProjectCard = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetch(`${API_BASE_URL}/projects`)
// //       .then(res => {
// //         if (!res.ok) throw new Error("Network response was not ok");
// //         return res.json();
// //       })
// //       .then(data => {
// //         setProjects(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message || "Failed to fetch projects");
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) return <div>Loading projects...</div>;
// //   if (error) return <div style={{color: "red"}}>Error: {error}</div>;
// //   if (!projects.length) return <div>No projects found.</div>;

// //   return (
// //     <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
// //       {projects.map(project => (
// //         <div
// //           key={project.id}
// //           style={{
// //             border: "1px solid #ddd",
// //             borderRadius: 8,
// //             width: 300,
// //             cursor: "pointer",
// //             padding: 16,
// //             background: "#fff",
// //             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
// //           }}
// //           onClick={() => navigate(`/projects/${project.id}`)}
// //         >
// //           {project.mediaType === "image" ? (
// //             <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
// //           ) : (
// //             <video src={project.mediaUrl} controls style={{ width: "100%", height: 180, borderRadius: 6 }} />
// //           )}
// //           <h3 style={{ margin: "1rem 0 0.5rem" }}>{project.title}</h3>
// //           <p style={{ color: "#555" }}>{project.description.slice(0, 80)}...</p>
// //           <div style={{ margin: "0.5rem 0" }}>
// //             <strong>Tech:</strong> {project.techStack.join(", ")}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default ProjectCard;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Use CRA env variable or fallback to hardcoded backend
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// const ProjectCard = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/projects`)
//       .then(res => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then(data => {
//         setProjects(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message || "Failed to fetch projects");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading projects...</div>;
//   if (error) return <div style={{color: "red"}}>Error: {error}</div>;
//   if (!projects.length) return <div>No projects found.</div>;

//   return (
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
//       {projects.map(project => (
//         <div
//           key={project.id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             width: 300,
//             cursor: "pointer",
//             padding: 16,
//             background: "#fff",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//           }}
//           onClick={() => navigate(`/projects/${project.id}`)}
//         >
//           {project.mediaType === "image" ? (
//             <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
//           ) : (
//             <video src={project.mediaUrl} controls style={{ width: "100%", height: 180, borderRadius: 6 }} />
//           )}
//           <h3 style={{ margin: "1rem 0 0.5rem" }}>{project.title}</h3>
//           <p style={{ color: "#555" }}>{project.description.slice(0, 80)}...</p>
//           <div style={{ margin: "0.5rem 0" }}>
//             <strong>Tech:</strong> {project.techStack.join(", ")}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProjectCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch projects");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div style={{color: "red"}}>Error: {error}</div>;
  if (!projects.length) return <div>No projects found.</div>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {projects.map(project => {
        if (!project) return null;
        return (
          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              width: 300,
              cursor: "pointer",
              padding: 16,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            {project.mediaType === "image" ? (
              <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
            ) : (
              <video src={project.mediaUrl} controls style={{ width: "100%", height: 180, borderRadius: 6 }} />
            )}
            <h3 style={{ margin: "1rem 0 0.5rem" }}>{project.title || "No Title"}</h3>
            <p style={{ color: "#555" }}>{project.description ? project.description.slice(0, 80) : "No Description"}</p>
            <div style={{ margin: "0.5rem 0" }}>
              <strong>Tech:</strong> {Array.isArray(project.techStack) ? project.techStack.join(", ") : "N/A"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
