// require('dotenv').config();

// // Add this right after require('dotenv').config();
// console.log('Checking environment variables...');
// console.log('MONGO_URI:', process.env.MONGO_URI ? 'Present' : 'Missing');
// console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'Missing');
// console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
// console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const projectRoutes = require('./routes/projectRoutes');

// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// // Verify required environment variables
// const requiredEnvVars = ['MONGO_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
// const missingVars = requiredEnvVars.filter(v => !process.env[v]);

// if (missingVars.length > 0) {
//   console.error('❌ Missing required environment variables:', missingVars.join(', '));
//   process.exit(1);
// }

// // Enhanced CORS configuration
// // app.use(cors({
// //   origin: process.env.FRONTEND_URL || ['http://localhost:3000','http://localhost:5173'],
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization'],
// //   credentials: true
// // }));

// app.use(cors({
//   origin: process.env.FRONTEND_URL || ['https://my-portfolio-five-mu-95.vercel.app','http://localhost:3000', 'http://localhost:5173'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
//   credentials: true,
//   exposedHeaders: ['x-auth-token']
// }));


// app.use(express.json({ limit: '15mb' }));
// app.use(express.urlencoded({ extended: true, limit: '15mb' }));
// app.use(cookieParser());
// // app.use(cookieParser()); // After express.json()


// // API documentation endpoint
// app.get('/api', (req, res) => {
//   res.json({
//     message: "Portfolio API",
//     version: "1.0.0",
//     endpoints: {
//       projects: "/api/projects",
//       health: "/health"
//     }
//   });
// });

// // Health check endpoint
// app.get('/', (req, res) => {
//   res.status(200).json({ 
//     status: 'OK',
//     db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // API routes
// app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRoutes);


// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Endpoint not found' });
// });

// // app.use('/api/auth', authRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(err.status || 500).json({
//     error: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000
// })
// .then(() => console.log('✅ MongoDB connected successfully'))
// .catch(err => {
//   console.error('❌ MongoDB connection error:', err.message);
//   console.log('Attempted to connect to:', process.env.MONGO_URI);
// });


// const PORT = process.env.PORT || 5000;
// const server = app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
// });

// // Handle server shutdown gracefully
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully...');
//   server.close(() => {
//     mongoose.connection.close(false, () => {
//       console.log('MongoDB connection closed');
//       process.exit(0);
//     });
//   });
// });
require('dotenv').config();

console.log('Checking environment variables...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Present' : 'Missing');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Verify required environment variables
const requiredEnvVars = ['MONGO_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// ✅ Updated CORS configuration
const allowedOrigins = [
  'https://my-portfolio-five-nu-95.vercel.app',
  'https://my-portfolio-five-mu-95.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ Not allowed by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  exposedHeaders: ['x-auth-token'],
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: "Portfolio API",
    version: "1.0.0",
    endpoints: {
      projects: "/api/projects",
      health: "/health"
    }
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('Attempted to connect to:', process.env.MONGO_URI);
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

