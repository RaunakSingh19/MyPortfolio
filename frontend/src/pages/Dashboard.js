import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, IconButton, TextField, Typography
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const API_URL = 'http://localhost:5000/api/projects'; // Adjust as needed

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    liveDemo: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id, publicId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { data: { publicId } });
      fetchProjects(); // Refresh
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      githubUrl: project.githubUrl,
      liveDemo: project.liveDemo || ''
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingProject.id}`, formData);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              {project.mediaType === 'image' ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={project.mediaUrl}
                  alt={project.title}
                />
              ) : (
                <CardMedia
                  component="video"
                  height="140"
                  controls
                  src={project.mediaUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">{project.description}</Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <IconButton onClick={() => handleEditClick(project)}><Edit /></IconButton>
                  <IconButton onClick={() => deleteProject(project.id, project.publicId)}><Delete /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={!!editingProject} onClose={() => setEditingProject(null)} fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth margin="dense" label="Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            fullWidth multiline margin="dense" label="Description"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="GitHub URL"
            value={formData.githubUrl}
            onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" label="Live Demo URL"
            value={formData.liveDemo}
            onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProject(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
