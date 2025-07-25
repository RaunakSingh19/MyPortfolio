require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const projectRoutes = require('./routes/projectRoutes');
// const authRoutes = require('./routes/authRoutes'); // Uncomment if auth is needed

const app = express();

// ========== Environment Variable Checks ==========
const requiredEnv = ['MONGO_URI', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

// ========== Middleware ==========
const allowedOrigins = ['http://localhost:3000','https://my-portfolio-five-ashy-23.vercel.app','my-portfolio-git-main-raunaksingh142004-gmailcoms-projects.vercel.app','my-portfolio-c5bqy7kfc-raunaksingh142004-gmailcoms-projects.vercel.app'];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());

// ========== Routes ==========
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

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRoutes); // Enable if needed

// ========== 404 Handler ==========
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ========== Error Handler ==========
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ========== MongoDB Connection ==========
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('Tried URI:', process.env.MONGO_URI);
    process.exit(1);
  });

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

// ========== Graceful Shutdown ==========
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});
