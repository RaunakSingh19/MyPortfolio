// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
// //   DialogContent, DialogTitle, Grid, IconButton, TextField, Typography
// // } from '@mui/material';
// // import { Delete, Edit } from '@mui/icons-material';

// // const API_URL = 'http://localhost:5000/api/projects'; // Adjust as needed

// // const Dashboard = () => {
// //   const [projects, setProjects] = useState([]);
// //   const [editingProject, setEditingProject] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     githubUrl: '',
// //     liveDemo: ''
// //   });

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);

// //   const fetchProjects = async () => {
// //     try {
// //       const res = await axios.get(API_URL);
// //       setProjects(res.data);
// //     } catch (error) {
// //       console.error('Error fetching projects:', error);
// //     }
// //   };

// //   const deleteProject = async (id, publicId) => {
// //     if (!window.confirm('Are you sure you want to delete this project?')) return;
// //     try {
// //       await axios.delete(`${API_URL}/${id}`, { data: { publicId } });
// //       fetchProjects(); // Refresh
// //     } catch (err) {
// //       console.error('Error deleting project:', err);
// //     }
// //   };

// //   const handleEditClick = (project) => {
// //     setEditingProject(project);
// //     setFormData({
// //       title: project.title,
// //       description: project.description,
// //       githubUrl: project.githubUrl,
// //       liveDemo: project.liveDemo || ''
// //     });
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       await axios.put(`${API_URL}/${editingProject.id}`, formData);
// //       setEditingProject(null);
// //       fetchProjects();
// //     } catch (err) {
// //       console.error('Error updating project:', err);
// //     }
// //   };

// //   return (
// //     <Box p={4}>
// //       <Typography variant="h4" gutterBottom>Dashboard</Typography>
// //       <Grid container spacing={3}>
// //         {projects.map((project) => (
// //           <Grid item xs={12} sm={6} md={4} key={project.id}>
// //             <Card>
// //               {project.mediaType === 'image' ? (
// //                 <CardMedia
// //                   component="img"
// //                   height="140"
// //                   image={project.mediaUrl}
// //                   alt={project.title}
// //                 />
// //               ) : (
// //                 <CardMedia
// //                   component="video"
// //                   height="140"
// //                   controls
// //                   src={project.mediaUrl}
// //                 />
// //               )}
// //               <CardContent>
// //                 <Typography variant="h6">{project.title}</Typography>
// //                 <Typography variant="body2" color="text.secondary">{project.description}</Typography>
// //                 <Box mt={2} display="flex" justifyContent="space-between">
// //                   <IconButton onClick={() => handleEditClick(project)}><Edit /></IconButton>
// //                   <IconButton onClick={() => deleteProject(project.id, project.publicId)}><Delete /></IconButton>
// //                 </Box>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Edit Dialog */}
// //       <Dialog open={!!editingProject} onClose={() => setEditingProject(null)} fullWidth>
// //         <DialogTitle>Edit Project</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             fullWidth margin="dense" label="Title"
// //             value={formData.title}
// //             onChange={e => setFormData({ ...formData, title: e.target.value })}
// //           />
// //           <TextField
// //             fullWidth multiline margin="dense" label="Description"
// //             value={formData.description}
// //             onChange={e => setFormData({ ...formData, description: e.target.value })}
// //           />
// //           <TextField
// //             fullWidth margin="dense" label="GitHub URL"
// //             value={formData.githubUrl}
// //             onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
// //           />
// //           <TextField
// //             fullWidth margin="dense" label="Live Demo URL"
// //             value={formData.liveDemo}
// //             onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setEditingProject(null)}>Cancel</Button>
// //           <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
//   DialogContent, DialogTitle, Grid, IconButton, TextField, Typography, Tooltip
// } from '@mui/material';
// import { Delete, Edit } from '@mui/icons-material';
// import '../stylesheets/Dashboard.css';

// const API_URL = 'http://localhost:5000/api/projects';

// const Dashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [editingProject, setEditingProject] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     githubUrl: '',
//     liveDemo: ''
//   });

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(API_URL);
//       setProjects(res.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     }
//   };

//   const deleteProject = async (id, publicId) => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return;
//     try {
//       await axios.delete(`${API_URL}/${id}`, { data: { publicId } });
//       fetchProjects();
//     } catch (err) {
//       console.error('Error deleting project:', err);
//     }
//   };

//   const handleEditClick = (project) => {
//     setEditingProject(project);
//     setFormData({
//       title: project.title,
//       description: project.description,
//       githubUrl: project.githubUrl,
//       liveDemo: project.liveDemo || ''
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`${API_URL}/${editingProject.id}`, formData);
//       setEditingProject(null);
//       fetchProjects();
//     } catch (err) {
//       console.error('Error updating project:', err);
//     }
//   };

//   return (
//     <Box className="dashboard-container">
//       <Typography variant="h4" className="dashboard-title">Project Dashboard</Typography>
//       <Grid container spacing={3}>
//         {projects.map((project) => (
//           <Grid item xs={12} sm={6} md={4} key={project.id}>
//             <Card className="project-card">
//               {project.mediaType === 'image' ? (
//                 <CardMedia
//                   component="img"
//                   height="180"
//                   image={project.mediaUrl}
//                   alt={project.title}
//                   className="card-media"
//                 />
//               ) : (
//                 <CardMedia
//                   component="video"
//                   height="180"
//                   controls
//                   src={project.mediaUrl}
//                   className="card-media"
//                 />
//               )}
//               <CardContent className="card-content">
//                 <Typography variant="h6" className="project-title">{project.title}</Typography>
//                 <Typography variant="body2" className="project-description">{project.description}</Typography>
//                 <Box mt={1}>
//                   <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
//                     GitHub
//                   </a>
//                   {project.liveDemo && (
//                     <>
//                       {' | '}
//                       <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">
//                         Live Demo
//                       </a>
//                     </>
//                   )}
//                 </Box>
//                 <Box mt={2} display="flex" justifyContent="space-between">
//                   <Tooltip title="Edit">
//                     <IconButton onClick={() => handleEditClick(project)} className="edit-btn">
//                       <Edit />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <IconButton onClick={() => deleteProject(project.id, project.publicId)} className="delete-btn">
//                       <Delete />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Edit Dialog */}
//       <Dialog open={!!editingProject} onClose={() => setEditingProject(null)} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Project</DialogTitle>
//         <DialogContent>
//           <TextField fullWidth margin="dense" label="Title"
//             value={formData.title}
//             onChange={e => setFormData({ ...formData, title: e.target.value })}
//           />
//           <TextField fullWidth margin="dense" label="Description" multiline rows={3}
//             value={formData.description}
//             onChange={e => setFormData({ ...formData, description: e.target.value })}
//           />
//           <TextField fullWidth margin="dense" label="GitHub URL"
//             value={formData.githubUrl}
//             onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
//           />
//           <TextField fullWidth margin="dense" label="Live Demo URL"
//             value={formData.liveDemo}
//             onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditingProject(null)} variant="outlined">Cancel</Button>
//           <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState ,TextField} from 'react';
import axios from 'axios';
import {
  Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, IconButton, Typography, Tooltip, Slide
} from '@mui/material';
import { Delete, Edit, Launch } from '@mui/icons-material';
import '../stylesheets/Dashboard.css';

const API_URL = 'http://localhost:5000/api/projects';

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

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    setEditing(false);
    setFormData({
      title: project.title,
      description: project.description,
      githubUrl: project.githubUrl,
      liveDemo: project.liveDemo || ''
    });
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    setEditing(false);
  };

  const startEdit = () => setEditing(true);

  const cancelEdit = () => {
    setEditing(false);
    setFormData({
      title: selectedProject.title,
      description: selectedProject.description,
      githubUrl: selectedProject.githubUrl,
      liveDemo: selectedProject.liveDemo || ''
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${selectedProject.id}`, formData);
      setEditing(false);
      fetchProjects();
      setSelectedProject({ ...selectedProject, ...formData });
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const deleteProject = async (id, publicId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`, { data: { publicId } });
      fetchProjects();
      closeProjectDetail();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
   
    <Box className="dashboard-root">
       
      <Typography variant="h4" className="dashboard-main-title">My Projects</Typography>
      <hr className='HR-LINE'></hr>
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              className="project-card-redesign"
              elevation={6}
              onClick={() => openProjectDetail(project)}
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
                  {project.description.length > 90
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
                &#10005;
              </IconButton>
            </DialogTitle>
            <DialogContent className="project-detail-content">
              <Box className="project-detail-media">
                {selectedProject.mediaType === 'image' ? (
                  <img src={selectedProject.mediaUrl} alt={selectedProject.title} />
                ) : (
                  <video src={selectedProject.mediaUrl} controls />
                )}
              </Box>
              <Typography variant="body1" className="project-detail-desc">
                {selectedProject.description}
              </Typography>
              <Box mt={2} mb={2} display="flex" flexDirection="row" gap={2}>
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
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => deleteProject(selectedProject.id, selectedProject.publicId)}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        )}

        {/* Edit Mode */}
        {selectedProject && editing && (
          <>
            <DialogTitle className="project-detail-title">Edit Project</DialogTitle>
            <DialogContent className="project-detail-content">
              <TextField
                fullWidth
                margin="dense"
                label="Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                sx={{ input: { color: '#fff', background: '#232323' }, label: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                sx={{ textarea: { color: '#fff', background: '#232323' }, label: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="GitHub URL"
                value={formData.githubUrl}
                onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                sx={{ input: { color: '#fff', background: '#232323' }, label: { color: '#fff' } }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Live Demo URL"
                value={formData.liveDemo}
                onChange={e => setFormData({ ...formData, liveDemo: e.target.value })}
                sx={{ input: { color: '#fff', background: '#232323' }, label: { color: '#fff' } }}
              />
            </DialogContent>
            <DialogActions className="project-detail-actions">
              <Button variant="outlined" onClick={cancelEdit}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Dashboard;
