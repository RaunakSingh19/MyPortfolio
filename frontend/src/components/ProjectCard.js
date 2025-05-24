import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import "../stylesheets/ProjectCard.css";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://myportfolio-zn87.onrender.com";

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`${API_BASE_URL}/projects`)
  //     .then(res => {
  //       if (!res.ok) throw new Error("Network response was not ok");
  //       return res.json();
  //     })
  //     .then(data => {
  //       setProjects(Array.isArray(data) ? data : []);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message || "Failed to fetch projects");
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    api.get('/projects')
      .then(res => {
        setProjects(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch projects");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="project-message">Loading projects...</div>;
  if (error) return <div className="project-message error">Error: {error}</div>;
  if (!projects.length) return <div className="project-message">No projects found.</div>;

  return (
    <div className="Full-Screen">
    <div className="project-card-container">
      {projects.map(project => {
        if (!project) return null;
        return (
          <div
            key={project.id}
            className="project-card"
            onClick={() => navigate(`/projects/${project.id}`)}
            onMouseEnter={e => e.currentTarget.classList.add("hover")}
            onMouseLeave={e => e.currentTarget.classList.remove("hover")}
          >
            <div className="project-media">
              {project.mediaType === "image" ? (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  className="project-img"
                />
              ) : (
                <video
                  src={project.mediaUrl}
                  controls
                  className="project-video"
                />
              )}
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title || "No Title"}</h3>
              <p className="project-desc">
                {project.description
                  ? project.description.slice(0, 82) + (project.description.length > 82 ? "..." : "")
                  : "No Description"}
              </p>
              <div className="project-tech">
                <strong>Tech:</strong>{" "}
                {Array.isArray(project.techStack)
                  ? project.techStack.join(", ")
                  : (typeof project.techStack === "string" ? project.techStack : "N/A")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default ProjectCard;
