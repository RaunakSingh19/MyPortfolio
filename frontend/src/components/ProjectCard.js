

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProjectCard.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const ProjectCardSkeleton = () => (
  <div className="project-card skeleton">
    <div className="project-media skeleton-media"></div>
    <div className="project-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-tech"></div>
    </div>
  </div>
);

const ProjectCard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pinnedProjects, setPinnedProjects] = useState(() => {
    const savedPins = localStorage.getItem("pinnedProjects");
    return savedPins ? JSON.parse(savedPins) : [];
  });
  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 22000);

      const response = await fetch(`${API_BASE_URL}/projects`, {
        signal: controller.signal,
        headers: { "Cache-Control": "max-age=300" },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load projects. Please try again later.");
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const togglePin = (id) => {
    setPinnedProjects((prev) => {
      const newPins = prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id];
      localStorage.setItem("pinnedProjects", JSON.stringify(newPins));
      return newPins;
    });
  };

  const isPinned = (id) => pinnedProjects.includes(id);

  if (loading) {
    return (
      <div className="Full-Screen">
        <div className="project-card-container">
          {[...Array(6)].map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className="Full-Screen">
        <div className="project-message error">
          <p>Unable to load projects</p>
          <button onClick={fetchProjects} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="Full-Screen">
        <div className="project-message">No projects found.</div>
      </div>
    );
  }

  return (
    <div className="Full-Screen">
      <div className="project-card-container">
        {projects.map((project) => {
          if (!project) return null;
          const id = project._id || project.id;

          return (
            <div
              key={id}
              className={`project-card ${isPinned(id) ? "pinned" : ""}`}
              onClick={() => navigate(`/projects/${id}`)}
              onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
            >
              {/* Pin Button */}
              <div
                className="pin-button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePin(id);
                }}
                title={isPinned(id) ? "Unpin Project" : "Pin Project"}
              >
                {isPinned(id) ? "📌" : "📍"}
              </div>

              <div className="project-media">
                {project.mediaType === "image" ? (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={project.mediaUrl}
                    className="project-video"
                    preload="metadata"
                  />
                )}
                <div className="media-overlay">
                  <span className="view-details">View Details</span>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title || "No Title"}</h3>
                <p className="project-desc">
                  {project.description
                    ? project.description.slice(0, 82) +
                      (project.description.length > 82 ? "..." : "")
                    : "No Description"}
                </p>
                <div className="project-tech">
                  <strong>Tech:</strong>{" "}
                  {Array.isArray(project.techStack)
                    ? project.techStack.slice(0, 3).join(", ") +
                      (project.techStack.length > 3 ? "..." : "")
                    : typeof project.techStack === "string"
                    ? project.techStack
                    : "N/A"}
                </div>
              </div>

              {isPinned(id) && <div className="pinned-tag">Featured</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectCard;