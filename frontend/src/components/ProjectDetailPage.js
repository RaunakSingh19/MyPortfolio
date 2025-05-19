import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === id);
        setProject(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading project details...</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: 24 }}>
      <Link to="/projects" style={{ textDecoration: "none", color: "#3498db" }}>← Back to Projects</Link>
      <h2 style={{ margin: "1rem 0" }}>{project.title}</h2>
      {project.mediaType === "image" ? (
        <img src={project.mediaUrl} alt={project.title} style={{ width: "100%", borderRadius: 6 }} />
      ) : (
        <video src={project.mediaUrl} controls style={{ width: "100%", borderRadius: 6 }} />
      )}
      <p style={{ margin: "1rem 0" }}>{project.description}</p>
      <div>
        <strong>Tech Stack:</strong> {project.techStack.join(", ")}
      </div>
      <div style={{ marginTop: 10 }}>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ marginRight: 12 }}>GitHub Repo</a>
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>
        )}
      </div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 16 }}>
        Created: {new Date(project.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

export default ProjectDetailPage;