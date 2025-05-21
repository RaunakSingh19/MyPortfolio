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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

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
//         setProjects(Array.isArray(data) ? data : []);
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
//       {projects.map(project => {
//         if (!project) return null;
//         return (
//           <div
//             key={project.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: 8,
//               width: 300,
//               cursor: "pointer",
//               padding: 16,
//               background: "#fff",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//             }}
//             onClick={() => navigate(`/projects/${project.id}`)}
//           >
//             {project.mediaType === "image" ? (
//               <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 6 }} />
//             ) : (
//               <video src={project.mediaUrl} controls style={{ width: "100%", height: 180, borderRadius: 6 }} />
//             )}
//             <h3 style={{ margin: "1rem 0 0.5rem" }}>{project.title || "No Title"}</h3>
//             <p style={{ color: "#555" }}>{project.description ? project.description.slice(0, 80) : "No Description"}</p>
//             <div style={{ margin: "0.5rem 0" }}>
//               <strong>Tech:</strong> {Array.isArray(project.techStack) ? project.techStack.join(", ") : "N/A"}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ProjectCard;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const cardShadow = "0 4px 24px 0 rgba(0,0,0,0.11)";

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

  if (loading) return (
    <div style={{
      color: "#fff", textAlign: "center", marginTop: "3rem"
    }}>Loading projects...</div>
  );
  if (error) return (
    <div style={{
      color: "tomato", textAlign: "center", marginTop: "3rem"
    }}>Error: {error}</div>
  );
  if (!projects.length) return (
    <div style={{
      color: "#ccc", textAlign: "center", marginTop: "3rem"
    }}>No projects found.</div>
  );

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "2.5rem",
      justifyContent: "center",
      marginTop: "3.5rem",
      marginBottom: "2.5rem"
    }}>
      {projects.map(project => {
        if (!project) return null;
        return (
          <div
            key={project.id}
            style={{
              borderRadius: 16,
              width: 320,
              cursor: "pointer",
              padding: 0,
              background: "#18191c",
              boxShadow: cardShadow,
              overflow: "hidden",
              border: "1.5px solid #232324",
              transition: "transform 0.13s, box-shadow 0.13s",
              color: "#fff",
              display: "flex",
              flexDirection: "column"
            }}
            onClick={() => navigate(`/projects/${project.id}`)}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-7px) scale(1.01)"}
            onMouseLeave={e => e.currentTarget.style.transform = ""}
          >
            <div style={{
              background: "#26272a",
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {project.mediaType === "image" ? (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: "0"
                  }}
                />
              ) : (
                <video
                  src={project.mediaUrl}
                  controls
                  style={{
                    width: "100%",
                    height: 180,
                    background: "#232324",
                    borderRadius: "0"
                  }}
                />
              )}
            </div>
            <div style={{ padding: "1.1rem 1.25rem 1.2rem" }}>
              <h3 style={{
                margin: "0 0 0.6rem 0",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#fff"
              }}>{project.title || "No Title"}</h3>
              <p style={{
                color: "#bdbdbd",
                minHeight: 40,
                fontSize: "1.01rem",
                margin: "0 0 0.7rem"
              }}>
                {project.description ? project.description.slice(0, 82) + (project.description.length > 82 ? "..." : "") : "No Description"}
              </p>
              <div style={{
                margin: "0.5rem 0 0 0",
                color: "#b2b2b2",
                fontSize: ".96rem"
              }}>
                <strong style={{ color: "#fff" }}>Tech:</strong>{" "}
                {Array.isArray(project.techStack)
                  ? project.techStack.join(", ")
                  : (typeof project.techStack === "string" ? project.techStack : "N/A")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;