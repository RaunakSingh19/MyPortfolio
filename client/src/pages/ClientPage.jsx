// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ProjectCard from '../components/ProjectCard';

// export default function ClientPage() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isMounted = true;
//     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/projects`, {
//           timeout: 5000
//         });
//         if (isMounted) {
//           setProjects(response.data);
//           setError('');
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(
//             err.response?.data?.error ||
//             err.message ||
//             'Failed to load projects. Please try again later.'
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProjects();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-3">Loading projects...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {location.state?.success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           {location.state.success}
//         </div>
//       )}
      
//       <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
      
//       {projects.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No projects found. Add your first project!</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map(project => (
//             <ProjectCard key={project._id} project={project} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './ClientPage.css';

// export default function ClientPage() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isMounted = true;
//     const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//     const fetchProjects = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/projects`, {
//           timeout: 5000
//         });
//         if (isMounted) {
//           setProjects(response.data || []); // Ensure we always have an array
//           setError('');
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(
//             err.response?.data?.error ||
//             err.message ||
//             'Failed to load projects. Please try again later.'
//           );
//           setProjects([]); // Set to empty array on error
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProjects();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <span>Loading projects...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="client-page">
//       {/* Section 1: Hero/Intro Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1 className="hero-title">Creative Developer & Designer</h1>
//           <p className="hero-subtitle">
//             Crafting digital experiences that blend creativity with technical excellence
//           </p>
//           <div className="hero-actions">
//             <button 
//               className="primary-button"
//               onClick={() => navigate('#projects')}
//             >
//               View Projects
//             </button>
//             <button 
//               className="secondary-button"
//               onClick={() => navigate('/contact')}
//             >
//               Contact Me
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Section 2: Projects Section */}
//       <section id="projects" className="projects-section">
//         <div className="section-header">
//           <h2>Featured Projects</h2>
//           <p>Check out some of my recent work</p>
//         </div>

//         {error && (
//           <div className="error-message">
//             {error}
//           </div>
//         )}
        
//         {location.state?.success && (
//           <div className="success-message">
//             {location.state.success}
//           </div>
//         )}
        
//         {/* Safely check projects array */}
//         {!projects || projects.length === 0 ? (
//           <div className="empty-state">
//             <p>No projects found. Add your first project!</p>
//           </div>
//         ) : (
//           <div className="projects-grid">
//             {projects.map(project => (
//               project && ( // Add null check for individual projects
//                 <div key={project._id} className="project-card">
//                   <div className="project-header">
//                     <h3>{project.title || 'Untitled Project'}</h3>
//                     {project.createdAt && (
//                       <div className="project-date">
//                         <span>📖</span>
//                         {new Date(project.createdAt).toLocaleDateString('en-US', {
//                           month: 'numeric',
//                           day: 'numeric',
//                           year: 'numeric'
//                         })}
//                       </div>
//                     )}
//                   </div>
//                   <p className="project-description">
//                     {project.description && (
//                       project.description.length > 100 
//                         ? `${project.description.substring(0, 100)}...` 
//                         : project.description
//                     )}
//                   </p>
//                   <button 
//                     className="view-project-button"
//                     onClick={() => navigate(`/projects/${project._id}`)}
//                   >
//                     View Project
//                   </button>
//                 </div>
//               )
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ClientPage.css';
import ErrorBoundary from '../components/ErrorBoundary'
import defaultUserImage from '../assets/rts.jpg'; // Replace with your actual image path

export default function ClientPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/projects`, {
          timeout: 5000
        });
        if (isMounted) {
          setProjects(response.data || []);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.error || err.message || 'Failed to load projects. Please try again later.'
          );
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <span>Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="client-page">
      {/* Section 1: Hero/About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-left">
            <h1 className="about-title">👋 Hi, I'm Raunak Singh</h1>
            <p className="about-subtitle">
              I’m a passionate <span>Full Stack Developer</span> and <span>UI/UX Designer</span>.<br />
              I love building beautiful, interactive digital products and crafting seamless user experiences.<br />
              With a strong background in React, Node.js, and design tools, I blend creativity with robust code.<br />
              <br />
              <span className="about-highlight">Let’s work together to bring your ideas to life!</span>
            </p>
            <div className="about-actions">
              <button 
                className="primary-button"
                onClick={() => document.getElementById('projects').scrollIntoView({behavior: 'smooth'})}
              >
                View Projects
              </button>
              <button 
                className="secondary-button"
                onClick={() => navigate('/contact')}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="about-right">
            <div className="about-image-wrapper">
              <img src={defaultUserImage} alt="Raunak Singh" className="about-image"/>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {location.state?.success && (
          <div className="success-message">
            {location.state.success}
          </div>
        )}

        {/* Projects grid redesigned (reference from image) */}
        {!projects || projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects found. Add your first project!</p>
          </div>
        ) : (
          <div className="projects-gallery">
            {projects.map(project =>
              project && (
                <div 
                  key={project._id} 
                  className="project-card-modern"
                  tabIndex={0}
                  onClick={() => navigate(`/projects/${project._id}`)}
                  onKeyDown={e => e.key === 'Enter' && navigate(`/projects/${project._id}`)}
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="project-media">
                    {project.mediaUrl && project.mediaUrl.match(/\.(mp4|webm)$/i) ? (
                      <video src={project.mediaUrl} alt={project.title} controls className="project-media-file"/>
                    ) : project.mediaUrl ? (
                      <img src={project.mediaUrl} alt={project.title} className="project-media-file"/>
                    ) : (
                      <div className="project-placeholder">
                        <span>🚀</span>
                      </div>
                    )}
                  </div>
                  <div className="project-card-content">
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title || 'Untitled Project'}</h3>
                      {project.createdAt && (
                        <span className="project-date">
                          <span role="img" aria-label="calendar">📅</span>
                          {new Date(project.createdAt).toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                    </div>
                    <p className="project-description">
                      {project.description && (
                        project.description.length > 70
                          ? `${project.description.substring(0, 70)}...`
                          : project.description
                      )}
                    </p>
                    <div className="project-meta">
                      <span className="tech-stack">
                        {project.techStack ? project.techStack.split(',').map(t => <span key={t} className="tech-pill">{t.trim()}</span>) : null}
                      </span>
                      <div className="project-links">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub"><span>🐙</span></a>}
                        {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" title="Live Demo"><span>🌐</span></a>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}