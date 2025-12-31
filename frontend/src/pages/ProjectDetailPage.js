import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/axios.js";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the specific project endpoint
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Project not found or failed to load");
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div style={{
        color: "#fff", 
        textAlign: "center", 
        marginTop: "3rem",
        fontSize: "1.2rem"
      }}>
        Loading project details...
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div style={{
        maxWidth: 600,
        margin: "3.5rem auto",
        background: "#191a1f",
        borderRadius: 16,
        padding: "2.5rem",
        color: "#fff",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#ff6b6b", marginBottom: "1rem" }}>
          {error || "Project Not Found"}
        </h2>
        <p style={{ color: "#ccc", marginBottom: "2rem" }}>
          The project you're looking for doesn't exist or couldn't be loaded.
        </p>
        <button
          onClick={() => navigate("/projects")}
          style={{
            background: "#00b4d8",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500"
          }}
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div style={{
      // marginTop:"105rem",
      maxWidth: 720,
      margin: "3.5rem auto 2.5rem auto",
      background: "#afaa9a",
      borderRadius: 16,
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.13)",
      padding: "2.5rem 2.2rem 2rem 2.2rem",
      color: "#fff"
    }}>
      {/* Back Button */}
      <Link
        to="/projects"
        style={{
          textDecoration: "none",
          color: "#000000ff",
          fontSize: 16,
          marginBottom: 12,
          display: "inline-block",
          transition: "color 0.13s",
          padding: "0.5rem 0"
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#1a1919ff"}
        onMouseLeave={e => e.currentTarget.style.color = "#b10000ff"}
      >
        ← Back to Projects
      </Link>

      {/* Project Title */}
      <h2 style={{
        margin: "1.1rem 0 0.7rem 0",
        color: "#fff",
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.3
      }}>
        {project.title}
      </h2>

      {/* Project Media */}
      <div style={{
        margin: "1.1rem 0",
        background: "#232324",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        {project.mediaType === "image" ? (
          <img
            src={project.mediaUrl}
            alt={project.title}
            style={{
              width: "100%",
              maxHeight: 400,
              objectFit: "cover",
              display: "block"
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400/232324/ffffff?text=Image+Not+Found";
            }}
          />
        ) : (
          <video
            src={project.mediaUrl}
            controls
            style={{
              width: "100%",
              maxHeight: 400,
              background: "#232324"
            }}
          />
        )}
      </div>

      {/* Project Description */}
      <p style={{
        margin: "1.5rem 0 1rem 0",
        fontSize: "1.1rem",
        color: "#000000ff",
        lineHeight: 1.7
      }}>
        {project.description}
      </p>

      {/* Tech Stack */}
      <div style={{
        margin: "1.5rem 0 1rem 0",
        fontSize: "1.05rem",
        color: "#cfcfcf"
      }}>
        <strong style={{ color: "#ffffffff", fontSize:"1rem" }}>Tech Stack: </strong>
        {Array.isArray(project.techStack) ? (
          <span style={{ color: "#fff" }}>
            {project.techStack.join(", ")}
          </span>
        ) : (
          <span style={{ color: "#fff" }}>
            {typeof project.techStack === "string" ? project.techStack : "Not specified"}
          </span>
        )}
      </div>

      {/* Project Links */}
      <div style={{
        margin: "2rem 0 1rem 0",
        display: "flex",
        gap: "1.5rem",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <a 
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#00e6b8",
            textDecoration: "none",
            fontWeight: 600,
            padding: "0.75rem 1.5rem",
            border: "2px solid #00e6b8",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "#00e6b8";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#00e6b8";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub Repository
        </a>
        
        {project.liveDemo && project.liveDemo.trim() !== "" && (
          <a 
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#bdbdbd",
              textDecoration: "none",
              fontWeight: 600,
              padding: "0.75rem 1.5rem",
              border: "2px solid #bdbdbd",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#bdbdbd";
              e.currentTarget.style.color = "#000";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#bdbdbd";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Live Demo
          </a>
        )}
      </div>

      {/* Creation Date */}
      {project.createdAt && (
        <div style={{
          fontSize: 14,
          color: "#000000ff",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)"
        }}>
          Created: {new Date(project.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;