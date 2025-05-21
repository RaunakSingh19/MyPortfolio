// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// const ProjectDetailPage = () => {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/projects`)
//       .then(res => res.json())
//       .then(data => {
//         const found = data.find(p => p.id === id);
//         setProject(found);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div>Loading project details...</div>;
//   if (!project) return <div>Project not found.</div>;

//   return (
//     <div style={{ maxWidth: 700, margin: "2rem auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
//       <Link to="/projects" style={{ textDecoration: "none", color: "#3498db" }}>← Back to Projects</Link>
//       <h2 style={{ margin: "1rem 0" }}>{project.title}</h2>
//       {project.mediaType === "image" ? (
//         <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", borderRadius: 6 }} />
//       ) : (
//         <video src={project.mediaUrl} controls style={{ width: "100%", borderRadius: 6 }} />
//       )}
//       <p style={{ margin: "1rem 0" }}>{project.description}</p>
//       <div>
//         <strong>Tech Stack:</strong> {project.techStack.join(", ")}
//       </div>
//       <div style={{ marginTop: 10 }}>
//         <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: 12 }}>GitHub Repo</a>
//         {project.liveDemo && (
//           <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>
//         )}
//       </div>
//       <div style={{ fontSize: 12, color: "#888", marginTop: 16 }}>
//         Created: {new Date(project.createdAt).toLocaleString()}
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailPage;
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find(p => p.id === id) : null;
        setProject(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{
    color: "#fff", textAlign: "center", marginTop: "3rem"
  }}>Loading project details...</div>;
  if (!project) return <div style={{
    color: "#ccc", textAlign: "center", marginTop: "3rem"
  }}>Project not found.</div>;

  return (
    <div style={{
      maxWidth: 720,
      margin: "3.5rem auto 2.5rem auto",
      background: "#191a1f",
      borderRadius: 16,
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.13)",
      padding: "2.5rem 2.2rem 2rem 2.2rem",
      color: "#fff"
    }}>
      <Link
        to="/projects"
        style={{
          textDecoration: "none",
          color: "#bdbdbd",
          fontSize: 16,
          marginBottom: 12,
          display: "inline-block",
          transition: "color 0.13s"
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#fff"}
        onMouseLeave={e => e.currentTarget.style.color = "#bdbdbd"}
      >
        ← Back to Projects
      </Link>
      <h2 style={{
        margin: "1.1rem 0 0.7rem 0",
        color: "#fff",
        fontWeight: 700,
        fontSize: "2rem"
      }}>{project.title}</h2>
      <div style={{
        margin: "1.1rem 0",
        background: "#232324",
        borderRadius: 10,
        overflow: "hidden"
      }}>
        {project.mediaType === "image" ? (
          <img
            src={project.mediaUrl}
            alt={project.title}
            style={{
              width: "100%",
              maxHeight: 360,
              objectFit: "cover",
              display: "block"
            }}
          />
        ) : (
          <video
            src={project.mediaUrl}
            controls
            style={{
              width: "100%",
              maxHeight: 360,
              borderRadius: 0,
              background: "#232324"
            }}
          />
        )}
      </div>
      <p style={{
        margin: "1.2rem 0 0.7rem 0",
        fontSize: "1.07rem",
        color: "#d0d0d0",
        lineHeight: 1.7
      }}>{project.description}</p>
      <div style={{
        margin: "1rem 0 0.7rem 0",
        fontSize: "1.01rem",
        color: "#cfcfcf"
      }}>
        <strong style={{ color: "#fff" }}>Tech Stack:</strong>{" "}
        {Array.isArray(project.techStack)
          ? project.techStack.join(", ")
          : (typeof project.techStack === "string" ? project.techStack : "N/A")}
      </div>
      <div style={{
        marginTop: 16,
        marginBottom: 8,
        fontSize: 16,
        display: "flex",
        gap: 24,
        flexWrap: "wrap"
      }}>
        <a href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#00e6b8",
            textDecoration: "none",
            fontWeight: 500,
            marginRight: 18,
            transition: "color 0.13s"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "#00e6b8"}
        >
          GitHub Repo
        </a>
        {project.liveDemo && (
          <a href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#bdbdbd",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.13s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "#bdbdbd"}
          >
            Live Demo
          </a>
        )}
      </div>
      <div style={{
        fontSize: 13,
        color: "#888",
        marginTop: 24,
        letterSpacing: 0.1
      }}>
        Created: {project.createdAt ? new Date(project.createdAt).toLocaleString() : "N/A"}
      </div>
    </div>
  );
};

export default ProjectDetailPage;