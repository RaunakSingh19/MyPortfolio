const express = require('express');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const { storage, cloudinary } = require('../config/cloudinary');
const Project = require('../models/Project');

const router = express.Router();

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 1 }, // max 15MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, MP4, and WebM allowed.'));
    }
    cb(null, true);
  },
});

// GET: Fetch all projects
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  })
);

// POST: Create a new project with media
router.post(
  '/',
  upload.single('media'),
  asyncHandler(async (req, res) => {
    const { title, description, techStack, githubUrl, liveDemo } = req.body;

    if (!title || !description || !techStack || !githubUrl) {
      return res.status(400).json({ error: 'Missing required fields: title, description, techStack, githubUrl' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No media file uploaded' });
    }

    try {
      const newProject = new Project({
        title,
        description,
        techStack: techStack.split(',').map(t => t.trim()),
        githubUrl,
        liveDemo: liveDemo || '',
        mediaUrl: req.file.path,
        mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
        publicId: req.file.filename,
      });

      await newProject.save();

      res.status(201).json({
        message: 'Project created successfully',
        project: newProject,
      });
    } catch (err) {
      // Clean up uploaded media from Cloudinary on error
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename, {
          resource_type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        });
      }
      throw err;
    }
  })
);

// DELETE: Remove a project by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(project.publicId, {
      resource_type: project.mediaType === 'video' ? 'video' : 'image',
    });

    // Delete from DB
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project deleted successfully' });
  })
);

// // PUT: Update a project (excluding media)
// router.put(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const { title, description, techStack, githubUrl, liveDemo } = req.body;

//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         techStack: techStack?.split(',').map(t => t.trim()) || [],
//         githubUrl,
//         liveDemo,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedProject) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     res.status(200).json({
//       message: 'Project updated successfully',
//       project: updatedProject,
//     });
//   })
// );

router.put('/:id', asyncHandler(async (req, res) => {
  const { title, description, techStack, githubUrl, liveDemo } = req.body;

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      techStack: techStack ? techStack.split(',').map(t => t.trim()) : [],
      githubUrl,
      liveDemo
    },
    { new: true, runValidators: true }
  );

  if (!updatedProject) {
    return res.status(404).json({ message: 'Project not found' });
  }

  res.json({ message: 'Project updated successfully', project: updatedProject });
}));

module.exports = router;
