import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${apiUrl}/projects/${id}`);
        if (isMounted) {
          setProject(res.data);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.error || err.message || 'Failed to load project.'
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProject();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="spinner"></div>
        <span>Loading project...</span>
      </div>
    );
  }

  if (error) {
    return <div className="project-detail-error">{error}</div>;
  }

  if (!project) {
    return <div className="project-detail-error">Project not found.</div>;
  }

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="project-detail-card">
        <div className="project-detail-media">
          {project.mediaUrl && project.mediaUrl.match(/\.(mp4|webm)$/i) ? (
            <video src={project.mediaUrl} controls className="project-detail-media-file"/>
          ) : project.mediaUrl ? (
            <img src={project.mediaUrl} alt={project.title} className="project-detail-media-file"/>
          ) : (
            <div className="project-detail-placeholder">
              <span>🚀</span>
            </div>
          )}
        </div>
        <div className="project-detail-info">
          <h2>{project.title}</h2>
          <div className="project-detail-date">
            {project.createdAt && (
              <>
                <span role="img" aria-label="calendar">📅</span>
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </>
            )}
          </div>
          <p className="project-detail-description">{project.description}</p>
          {project.techStack && (
            <div className="project-detail-stack">
              {project.techStack.split(',').map(t => (
                <span key={t} className="project-detail-pill">{t.trim()}</span>
              ))}
            </div>
          )}
          <div className="project-detail-links">
            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub Repo</a>}
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
          </div>
        </div>
      </div>
    </div>
  );
}