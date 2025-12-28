import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProjectPreview.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ProjectPreview = () => {
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

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/projects`);
      const data = await response.json();

      const pinnedIds = JSON.parse(localStorage.getItem("pinnedProjects")) || [];
      const pinnedProjects = data.filter(p => pinnedIds.includes(p._id || p.id));

      // fallback if no pinned projects
      setProjects(pinnedProjects.length ? pinnedProjects : data.slice(0, 3));
    } catch (err) {
      console.error("Error loading projects:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);

  if (loading) return <div className="project-preview-message">Loading projects...</div>;
  if (error) return <div className="project-preview-message error">Error: {error}</div>;
  if (!projects.length) return <div className="project-preview-message">No projects found.</div>;

  return (
    <div className="project-preview-section">
      <h2 className="project-preview-heading">Latest Projects</h2>
     
      <div className="project-preview-container">
  {projects.slice(0, 3).map(project => (
    <div
      key={project.id}
      className="project-preview-card"
      onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="project-preview-media">
        {project.mediaType === "image" ? (
          <img
            src={project.mediaUrl}
            alt={project.title}
            className="project-preview-img"
          />
        ) : (
          <video
            src={project.mediaUrl}
            controls
            className="project-preview-video"
          />
        )}
      </div>
      <div className="project-preview-content">
        <h3 className="project-preview-title">{project.title || "No Title"}</h3>
        <p className="project-preview-desc">
          {project.description
            ? project.description.slice(0, 300) + (project.description.length > 120 ? "..." : "")
            : "No Description"}
        </p>
        <div className="project-preview-tech">
          <strong>Tech:</strong>{" "}
          {Array.isArray(project.techStack)
            ? project.techStack.join(", ")
            : (typeof project.techStack === "string" ? project.techStack : "N/A")}
        </div>
      </div>
    </div>
  ))}
</div>
      <div className="project-preview-link-row">
        <button className="project-preview-viewall" onClick={() => navigate("/projects")}>
          View All Projects
        </button>
      </div>
    </div>
  );
};

export default ProjectPreview;