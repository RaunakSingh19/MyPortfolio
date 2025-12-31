
const express = require('express');
const multer = require('multer');
const asyncHandler = require('express-async-handler');
const { storage, cloudinary } = require('../config/cloudinary');
const Project = require('../models/Project');
const router = express.Router();

// Simple in-memory cache (for production use Redis)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Multer configuration (keep existing)
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPEG, PNG, GIF, MP4, and WebM allowed.'));
    }
    cb(null, true);
  },
});

// GET: Fetch all projects - OPTIMIZED VERSION
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const cacheKey = 'all_projects';
    const cached = cache.get(cacheKey);   
    // Return cached data if available and not expired
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
      console.log('✅ Serving projects from cache');
      return res.status(200).json(cached.data);
    }
    console.log('🔄 Fetching projects from database');    
     // Optimized query - only select necessary fields
    const projects = await Project.find()
      .select('title description techStack githubUrl liveDemo mediaUrl mediaType createdAt')
      .sort({ createdAt: -1 })
      .lean() // Returns plain JavaScript objects instead of Mongoose documents
      .maxTimeMS(10000); // 10 second timeout
    // Cache the results
    cache.set(cacheKey, {
      data: projects,
      timestamp: Date.now()
    });
    // Clear cache on any modification operations
    const clearCache = () => {
      cache.delete(cacheKey);
      console.log('🗑️ Projects cache cleared');
    };
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
      // Clear cache after creating new project
      cache.delete('all_projects');
      res.status(201).json({
        message: 'Project created successfully',
        project: newProject,
      });
    } catch (err) {
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename, {
          resource_type: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
        });
      }
      throw err;
    }
  })
);
//get 
// GET: Fetch single project by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  })
);

// PUT: Update a project
router.put('/:id', asyncHandler(async (req, res) => {
  const { title, description, techStack, githubUrl, liveDemo } = req.body;

  // Find existing project first
  const existingProject = await Project.findById(req.params.id);
  if (!existingProject) {
    return res.status(404).json({ message: 'Project not found' });
  }

  // Prepare update data with proper techStack handling
  const updateData = {
    title: title || existingProject.title,
    description: description || existingProject.description,
    githubUrl: githubUrl || existingProject.githubUrl,
    liveDemo: liveDemo !== undefined ? liveDemo : existingProject.liveDemo
  };

  // Handle techStack conversion from string to array
  if (techStack !== undefined) {
    if (typeof techStack === 'string' && techStack.trim() !== '') {
      updateData.techStack = techStack.split(',').map(t => t.trim()).filter(t => t !== '');
    } else if (Array.isArray(techStack)) {
      updateData.techStack = techStack.filter(t => t !== '');
    } else {
      updateData.techStack = existingProject.techStack;
    }
  } else {
    updateData.techStack = existingProject.techStack;
  }
  // Validate that techStack is not empty
  if (updateData.techStack.length === 0) {
    return res.status(400).json({ error: 'At least one technology is required in techStack' });
  }
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );
  // Clear cache after update
  cache.delete('all_projects');
  res.json({ 
    message: 'Project updated successfully', 
    project: updatedProject 
  });
}));
// DELETE: Remove a project by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await cloudinary.uploader.destroy(project.publicId, {
      resource_type: project.mediaType === 'video' ? 'video' : 'image',
    });
    await Project.findByIdAndDelete(req.params.id);
    // Clear cache after deletion
    cache.delete('all_projects');

    res.status(200).json({ message: 'Project deleted successfully' });
  })
);
module.exports = router;