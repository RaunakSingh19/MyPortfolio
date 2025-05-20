
// const express = require('express');
// const multer = require('multer');
// const { storage, cloudinary } = require('../config/cloudinary');
// const Project = require('../models/Project');
// const router = express.Router();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 15 * 1024 * 1024,
//     files: 1
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = [
//       'image/jpeg', 
//       'image/png', 
//       'image/gif',
//       'video/mp4',
//       'video/webm'
//     ];
    
//     if (!allowedTypes.includes(file.mimetype)) {
//       const error = new Error('Invalid file type. Only images (JPEG, PNG, GIF) and videos (MP4, WebM) are allowed.');
//       error.status = 400;
//       return cb(error);
//     }
//     cb(null, true);
//   }
// });

// // GET all projects
// router.get('/', async (req, res, next) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (error) {
//     console.error('Failed to fetch projects:', error);
//     next(error);
//   }
// });

// // POST new project
// router.post('/', upload.single('media'), async (req, res, next) => {
//   try {
//     // Validate required fields
//     const requiredFields = ['title', 'description', 'techStack', 'githubUrl'];
//     const missingFields = requiredFields.filter(field => !req.body[field]);
    
//     if (missingFields.length > 0) {
//       const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
//       error.status = 400;
//       throw error;
//     }

//     if (!req.file) {
//       const error = new Error('No media file uploaded');
//       error.status = 400;
//       throw error;
//     }

//     const project = new Project({
//       title: req.body.title,
//       description: req.body.description,
//       techStack: req.body.techStack.split(',').map(tech => tech.trim()),
//       githubUrl: req.body.githubUrl,
//       liveDemo: req.body.liveDemo || '',
//       mediaUrl: req.file.path,
//       mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
//       publicId: req.file.filename
//     });

//     await project.save();
    
//     res.status(201).json({
//       message: 'Project created successfully',
//       project
//     });

//   } catch (error) {
//     // Clean up uploaded file if project creation fails
//     if (req.file) {
//       try {
//         await cloudinary.uploader.destroy(req.file.filename);
//       } catch (cleanupError) {
//         console.error('Failed to cleanup uploaded file:', cleanupError);
//       }
//     }
//     next(error);
//   }
// });

// // DELETE a project by ID
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     // Delete media from Cloudinary
//     await cloudinary.uploader.destroy(project.publicId, {
//       resource_type: project.mediaType === 'video' ? 'video' : 'image'
//     });

//     // Delete project from DB
//     await Project.findByIdAndDelete(req.params.id);

//     res.json({ message: 'Project deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// });


// // PUT update a project by ID (without updating media)
// router.put('/:id', async (req, res, next) => {
//   try {
//     const { title, description, techStack, githubUrl, liveDemo } = req.body;

//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         techStack: techStack.split(',').map(t => t.trim()),
//         githubUrl,
//         liveDemo
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedProject) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     res.json({
//       message: 'Project updated successfully',
//       project: updatedProject
//     });
//   } catch (err) {
//     next(err);
//   }
// });


// module.exports = router;


const express = require('express');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');
const Project = require('../models/Project');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/webm'
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Invalid file type. Only JPEG, PNG, GIF (images) and MP4, WebM (videos) allowed.');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  }
});

// GET all projects
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  })
);

// POST new project
router.post(
  '/',
  upload.single('media'),
  asyncHandler(async (req, res) => {
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

    try {
      const project = new Project({
        title: req.body.title,
        description: req.body.description,
        techStack: req.body.techStack.split(',').map(t => t.trim()),
        githubUrl: req.body.githubUrl,
        liveDemo: req.body.liveDemo || '',
        mediaUrl: req.file.path,
        mediaType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
        publicId: req.file.filename
      });

      await project.save();

      res.status(201).json({ message: 'Project created successfully', project });

    } catch (err) {
      // Cleanup uploaded file if project save fails
      if (req.file && req.file.filename) {
        await cloudinary.uploader.destroy(req.file.filename, {
          resource_type: req.file.mimetype.startsWith('video/') ? 'video' : 'image'
        });
      }
      throw err;
    }
  })
);

// DELETE a project by ID
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await cloudinary.uploader.destroy(project.publicId, {
      resource_type: project.mediaType === 'video' ? 'video' : 'image'
    });

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  })
);

// PUT update a project (excluding media)
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { title, description, techStack, githubUrl, liveDemo } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        techStack: techStack?.split(',').map(t => t.trim()) || [],
        githubUrl,
        liveDemo
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', project: updated });
  })
);

module.exports = router;
