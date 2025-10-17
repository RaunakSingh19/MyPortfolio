import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, IconButton, Typography, Tooltip, Slide, TextField
} from '@mui/material';
import { Delete, Edit, Launch } from '@mui/icons-material';
import '../stylesheets/Dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveDemo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
      setError('');
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setEditing(false);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
      githubUrl: project.githubUrl,
      liveDemo: project.liveDemo || ''
    });
    setError('');
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    setEditing(false);
    setError('');
  };

  const startEdit = () => setEditing(true);

  const cancelEdit = () => {
    setEditing(false);
    if (selectedProject) {
      setFormData({
        title: selectedProject.title,
        description: selectedProject.description,
        techStack: Array.isArray(selectedProject.techStack) ? selectedProject.techStack.join(', ') : '',
        githubUrl: selectedProject.githubUrl,
        liveDemo: selectedProject.liveDemo || ''
      });
    }
    setError('');
  };

  // Update Project - FIXED VERSION
  const handleUpdate = async () => {
    if (!selectedProject) return;

    try {
      setLoading(true);
      setError('');

      const updatePayload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        techStack: formData.techStack.trim(),
        githubUrl: formData.githubUrl.trim(),
        liveDemo: formData.liveDemo.trim()
      };

      console.log('Sending update payload:', updatePayload);

      // Validate required fields
      if (!updatePayload.title || !updatePayload.description || !updatePayload.techStack || !updatePayload.githubUrl) {
        throw new Error('All fields except Live Demo are required');
      }

      const res = await fetch(`${API_BASE_URL}/projects/${selectedProject._id || selectedProject.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload)
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || responseData.message || `HTTP error! status: ${res.status}`);
      }

      console.log('Update successful:', responseData);
      
      setEditing(false);
      await fetchProjects(); // Refresh the list
      
      // Update the selected project with new data
      if (responseData.project) {
        setSelectedProject(responseData.project);
      }
      
      alert('Project updated successfully!');
    } catch (err) {
      console.error('Error updating project:', err);
      setError(err.message);
      alert(`Update failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;
    
    try {
      setLoading(true);
      const projectId = id || selectedProject?._id || selectedProject?.id;
      
      const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Delete failed');
      }
      
      await fetchProjects();
      closeProjectDetail();
      alert('Project deleted successfully!');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Delete failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading && projects.length === 0) {
    return (
      <Box className="dashboard-root">
        <Typography variant="h4" className="dashboard-main-title">My Projects</Typography>
        <hr className='HR-LINE' />
        <Typography>Loading projects...</Typography>
      </Box>
    );
  }

  return (
    <Box className="dashboard-root">
      <Typography variant="h4" className="dashboard-main-title">My Projects</Typography>
      <hr className='HR-LINE'></hr>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id || project.id}>
            <Card
              className="project-card-redesign"
              elevation={6}
              onClick={() => openProjectDetail(project)}
              sx={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}
            >
              <Box className="project-media-container">
                {project.mediaType === 'image' ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={project.mediaUrl}
                    alt={project.title}
                    className="project-card-media"
                  />
                ) : (
                  <CardMedia
                    component="video"
                    height="180"
                    controls={false}
                    src={project.mediaUrl}
                    className="project-card-media"
                  />
                )}
              </Box>
              <CardContent className="project-card-content">
                <Typography variant="h6" className="project-card-title">{project.title}</Typography>
                <Typography variant="body2" color="textSecondary" className="project-card-description">
                  {project.description && project.description.length > 90
                    ? project.description.slice(0, 90) + '...'
                    : project.description}
                </Typography>
                <Box mt={1} display="flex" alignItems="center" gap={1}>
                  <Tooltip title="GitHub Repository">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card-link"
                      onClick={e => e.stopPropagation()}
                    >
                      <Launch fontSize="small" /> GitHub
                    </a>
                  </Tooltip>
                  {project.liveDemo && (
                    <Tooltip title="Live Demo">
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-link"
                        onClick={e => e.stopPropagation()}
                      >
                        <Launch fontSize="small" /> Live Demo
                      </a>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onClose={closeProjectDetail}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        PaperProps={{ className: 'project-detail-dialog' }}
      >
        {selectedProject && !editing && (
          <>
            <DialogTitle className="project-detail-title">
              {selectedProject.title}
              <IconButton
                aria-label="close"
                onClick={closeProjectDetail}
                style={{ position: 'absolute', right: 15, top: 10, color: '#fff' }}
              >
                ✕
              </IconButton>
            </DialogTitle>
            <DialogContent className="project-detail-content">
              <Box className="project-detail-media">
                {selectedProject.mediaType === 'image' ? (
                  <img 
                    src={selectedProject.mediaUrl} 
                    alt={selectedProject.title} 
                    style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'contain' }} 
                  />
                ) : (
                  <video 
                    src={selectedProject.mediaUrl} 
                    controls 
                    style={{ width: '100%', borderRadius: '8px', maxHeight: '400px' }} 
                  />
                )}
              </Box>
              
              <Typography variant="body1" className="project-detail-desc" sx={{ mt: 2, mb: 2 }}>
                {selectedProject.description}
              </Typography>
              
              <Box mt={2} mb={2}>
                <Typography variant="subtitle1" sx={{ color: '#fff', mb: 1 }}>
                  <strong>Tech Stack:</strong> {Array.isArray(selectedProject.techStack) ? selectedProject.techStack.join(', ') : selectedProject.techStack}
                </Typography>
              </Box>
              
              <Box mt={2} mb={2} display="flex" flexDirection="row" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  color="primary"
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-detail-btn"
                  startIcon={<Launch />}
                >
                  GitHub
                </Button>
                {selectedProject.liveDemo && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-detail-btn"
                    startIcon={<Launch />}
                  >
                    Live Demo
                  </Button>
                )}
              </Box>
            </DialogContent>
            <DialogActions className="project-detail-actions">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Edit />}
                onClick={startEdit}
                disabled={loading}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => deleteProject(selectedProject._id || selectedProject.id)}
                disabled={loading}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        )}

        {/* Edit Mode */}
        {selectedProject && editing && (
          <>
            <DialogTitle className="project-detail-title">
              Edit Project
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
            </DialogTitle>
            <DialogContent className="project-detail-content">
              <TextField
                fullWidth
                margin="dense"
                label="Title *"
                value={formData.title}
                onChange={e => handleInputChange('title', e.target.value)}
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  mb: 2 
                }}
                disabled={loading}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description *"
                multiline
                rows={4}
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                sx={{ 
                  textarea: { color: '#fff' }, 
                  label: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  mb: 2 
                }}
                disabled={loading}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Tech Stack * (comma separated)"
                value={formData.techStack}
                onChange={e => handleInputChange('techStack', e.target.value)}
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  mb: 2 
                }}
                placeholder="React, Node.js, MongoDB, Express"
                disabled={loading}
                helperText="Separate technologies with commas"
              />
              <TextField
                fullWidth
                margin="dense"
                label="GitHub URL *"
                value={formData.githubUrl}
                onChange={e => handleInputChange('githubUrl', e.target.value)}
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  mb: 2 
                }}
                disabled={loading}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Live Demo URL"
                value={formData.liveDemo}
                onChange={e => handleInputChange('liveDemo', e.target.value)}
                sx={{ 
                  input: { color: '#fff' }, 
                  label: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#555' },
                    '&:hover fieldset': { borderColor: '#888' },
                  },
                  mb: 2 
                }}
                placeholder="Optional"
                disabled={loading}
              />
            </DialogContent>
            <DialogActions className="project-detail-actions">
              <Button 
                variant="outlined" 
                onClick={cancelEdit}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Dashboard;