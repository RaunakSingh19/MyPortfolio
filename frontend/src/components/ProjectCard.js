// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../stylesheets/ProjectCard.css";

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

//   if (loading) return <div className="project-message">Loading projects...</div>;
//   if (error) return <div className="project-message error">Error: {error}</div>;
//   if (!projects.length) return <div className="project-message">No projects found.</div>;

//   return (
//     <div className="Full-Screen">
//     <div className="project-card-container">
//       {projects.map(project => {
//         if (!project) return null;
//         return (
//           <div
//             key={project.id}
//             className="project-card"
//             onClick={() => navigate(`/projects/${project.id}`)}
//             onMouseEnter={e => e.currentTarget.classList.add("hover")}
//             onMouseLeave={e => e.currentTarget.classList.remove("hover")}
//           >
//             <div className="project-media">
//               {project.mediaType === "image" ? (
//                 <img
//                   src={project.mediaUrl}
//                   alt={project.title}
//                   className="project-img"
//                 />
//               ) : (
//                 <video
//                   src={project.mediaUrl}
//                   controls
//                   className="project-video"
//                 />
//               )}
//             </div>
//             <div className="project-content">
//               <h3 className="project-title">{project.title || "No Title"}</h3>
//               <p className="project-desc">
//                 {project.description
//                   ? project.description.slice(0, 82) + (project.description.length > 82 ? "..." : "")
//                   : "No Description"}
//               </p>
//               <div className="project-tech">
//                 <strong>Tech:</strong>{" "}
//                 {Array.isArray(project.techStack)
//                   ? project.techStack.join(", ")
//                   : (typeof project.techStack === "string" ? project.techStack : "N/A")}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//     </div>
//   );
// };

// export default ProjectCard;
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ProjectCard.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Skeleton Loader Component
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
  const navigate = useNavigate();

  // Memoized fetch function
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${API_BASE_URL}/projects`, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=300',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
      
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Fetch error:', err);
        setError(err.message || "Failed to load projects. Please try again later.");
        
        // Set empty array instead of showing error for better UX
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Retry function
  const retryFetch = () => {
    fetchProjects();
  };

  // Preload images and videos
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach(project => {
        if (project.mediaUrl) {
          const media = project.mediaType === 'image' 
            ? new Image() 
            : document.createElement('video');
          media.src = project.mediaUrl;
        }
      });
    }
  }, [projects]);

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
          <button onClick={retryFetch} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="Full-Screen">
        <div className="project-message">
          No projects found.
        </div>
      </div>
    );
  }

  return (
    <div className="Full-Screen">
      <div className="project-card-container">
        {projects.map(project => {
          if (!project) return null;
          return (
            <div
              key={project._id || project.id}
              className="project-card"
              onClick={() => navigate(`/projects/${project._id || project.id}`)}
              onMouseEnter={e => e.currentTarget.classList.add("hover")}
              onMouseLeave={e => e.currentTarget.classList.remove("hover")}
            >
              <div className="project-media">
                {project.mediaType === "image" ? (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="project-img"
                    loading="lazy" // Lazy loading for images
                  />
                ) : (
                  <video
                    src={project.mediaUrl}
                    controls={false} // Don't show controls initially for faster load
                    className="project-video"
                    preload="metadata" // Only load metadata initially
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
                    ? project.description.slice(0, 82) + (project.description.length > 82 ? "..." : "")
                    : "No Description"}
                </p>
                <div className="project-tech">
                  <strong>Tech:</strong>{" "}
                  {Array.isArray(project.techStack)
                    ? project.techStack.slice(0, 3).join(", ") + (project.techStack.length > 3 ? "..." : "")
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