
const express = require('express');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');
const Project = require('../models/Project');
const router = express.Router();

const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 
      'image/png', 
      'image/gif',
      'video/mp4',
      'video/webm'
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Invalid file type. Only images (JPEG, PNG, GIF) and videos (MP4, WebM) are allowed.');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  }
});

// GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    next(error);
  }
});

// POST new project
router.post('/', upload.single('media'), async (req, res, next) => {
  try {
    // Validate required fields
    const requiredFields = ['title', 'description', 'techStack', 'githubUrl'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
      error.status = 400;
      throw error;
    }

    if (!req.file) {
      const error = new Error('No media file uploaded');
      error.status = 400;
      throw error;
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      techStack: req.body.techStack.split(',').map(tech => tech.trim()),
      githubUrl: req.body.githubUrl,
      liveDemo: req.body.liveDemo || '',
      mediaUrl: req.file.path,
      mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
      publicId: req.file.filename
    });

    await project.save();
    
    res.status(201).json({
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    // Clean up uploaded file if project creation fails
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cleanupError) {
        console.error('Failed to cleanup uploaded file:', cleanupError);
      }
    }
    next(error);
  }
});

module.exports = router;
