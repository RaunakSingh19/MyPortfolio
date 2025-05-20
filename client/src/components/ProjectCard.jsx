
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// // import ProjectCard from '../components/ProjectCard';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// export default function ClientPage() {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         setError('');
//         setLoading(true);
//         const res = await axios.get(`${API_URL}/projects`);
//         setProjects(res.data);
//       } catch (err) {
//         setError('Failed to load projects. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProjects();
//   }, []);

//   return (
//     <div>
//       {location.state?.success && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           {location.state.success}
//         </div>
//       )}

//       <h2 className="text-2xl font-bold mb-6">My Projects2</h2>

//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ClientPage.css'; // Import the separate CSS file

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ClientPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    async function fetchProjects() {
      try {
        setError('');
        setLoading(true);
        const res = await axios.get(`${API_URL}/projects`);
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="client-page">
      {location.state?.success && (
        <div className="success-message">
          {location.state.success}
        </div>
      )}

      <h2 className="page-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-details">
              {project.createdAt && (
                <p className="project-date">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              )}
              {project.status && (
                <p className="project-status">Status: {project.status}</p>
              )}
              {project.budget && (
                <p className="project-budget">Budget: ${project.budget}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}