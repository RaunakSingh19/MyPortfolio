// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');
// // const router = express.Router();

// // const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret'; // Add fallback for development

// // // Register - Updated with better validation
// // router.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     // Basic validation
// //     if (!name || !email || !password) {
// //       return res.status(400).json({ error: 'All fields are required' });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: 'Email already exists' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword
// //     });

// //     // Generate token
// //     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

// //     res.status(201).json({
// //       message: 'User registered successfully',
// //       token,
// //       user: {
// //         id: newUser._id,
// //         name: newUser.name,
// //         email: newUser.email
// //       }
// //     });

// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({
// //       error: 'Registration failed',
// //       ...(process.env.NODE_ENV === 'development' && { details: error.message })
// //     });
// //   }
// // });

// // // Login - Updated with better response
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ error: 'Email and password are required' });
// //     }

// //     const user = await User.findOne({ email });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }

// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

// //     res
// //       .cookie('token', token, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === 'production',
// //         sameSite: 'strict',
// //         maxAge: 24 * 60 * 60 * 1000
// //       })
// //       .json({
// //         message: 'Login successful',
// //         user: {
// //           id: user._id,
// //           name: user.name,
// //           email: user.email
// //         }
// //       });

// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({
// //       error: 'Login failed',
// //       ...(process.env.NODE_ENV === 'development' && { details: error.message })
// //     });
// //   }
// // });

// // // Keep existing logout and me routes unchanged
// // // ... (rest of the file remains the same)

// // module.exports = router;
// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');
// // const router = express.Router();
// // const verifyToken = require('../middleware/verifyToken');

// // const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// // // Register
// // router.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ error: 'All fields are required' });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: 'Email already exists' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     });

// //     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

// //     res
// //       .cookie('token', token, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === 'production',
// //         sameSite: 'strict',
// //         maxAge: 24 * 60 * 60 * 1000,
// //       })
// //       .status(201)
// //       .json({
// //         message: 'User registered successfully',
// //         user: {
// //           id: newUser._id,
// //           name: newUser.name,
// //           email: newUser.email,
// //         },
// //       });
// //   } catch (error) {
// //     console.error('Registration error:', error);
// //     res.status(500).json({
// //       error: 'Registration failed',
// //       ...(process.env.NODE_ENV === 'development' && { details: error.message }),
// //     });
// //   }
// // });

// // // Login
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ error: 'Email and password are required' });
// //     }

// //     const user = await User.findOne({ email });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }

// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

// //     res
// //       .cookie('token', token, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === 'production',
// //         sameSite: 'strict',
// //         maxAge: 24 * 60 * 60 * 1000,
// //       })
// //       .json({
// //         message: 'Login successful',
// //         user: {
// //           id: user._id,
// //           name: user.name,
// //           email: user.email,
// //         },
// //       });
// //   } catch (error) {
// //     console.error('Login error:', error);
// //     res.status(500).json({
// //       error: 'Login failed',
// //       ...(process.env.NODE_ENV === 'development' && { details: error.message }),
// //     });
// //   }
// // });

// // // Authenticated user profile

// // router.get('/me', verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select('-password');
// //     if (!user) return res.status(404).json({ message: 'User not found' });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;
// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const router = express.Router();
// // const verifyToken = require("../middleware/verifyToken");

// // const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// // // Register
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ error: "All fields are required" });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: "Email already exists" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const newUser = await User.create({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     });

// //     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
// //       expiresIn: "1d",
// //     });

// //     res
// //       .cookie("token", token, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === "production",
// //         sameSite: "none", // <-- changed from 'strict' to 'none' for cross-site cookies
// //         maxAge: 24 * 60 * 60 * 1000,
// //       })
// //       .status(201)
// //       .json({
// //         message: "User registered successfully",
// //         user: {
// //           id: newUser._id,
// //           name: newUser.name,
// //           email: newUser.email,
// //         },
// //         token, // Optionally return the token for client local storage fallback
// //       });
// //   } catch (error) {
// //     console.error("Registration error:", error);
// //     res.status(500).json({
// //       error: "Registration failed",
// //       ...(process.env.NODE_ENV === "development" && { details: error.message }),
// //     });
// //   }
// // });

// // // Login
// // router.post("/login", async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ error: "Email and password are required" });
// //     }

// //     const user = await User.findOne({ email });
// //     if (!user || !(await bcrypt.compare(password, user.password))) {
// //       return res.status(401).json({ error: "Invalid credentials" });
// //     }

// //     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

// //     res
// //       .cookie("token", token, {
// //         httpOnly: true,
// //         secure: process.env.NODE_ENV === "production",
// //         sameSite: "none", // <-- changed from 'strict' to 'none' for cross-site cookies
// //         maxAge: 24 * 60 * 60 * 1000,
// //       })
// //       .json({
// //         message: "Login successful",
// //         user: {
// //           id: user._id,
// //           name: user.name,
// //           email: user.email,
// //         },
// //         token, // Optionally return the token for client local storage fallback
// //       });
// //   } catch (error) {
// //     console.error("Login error:", error);
// //     res.status(500).json({
// //       error: "Login failed",
// //       ...(process.env.NODE_ENV === "development" && { details: error.message }),
// //     });
// //   }
// // });

// // // Logout (optional, good practice for clearing cookie)
// // router.post("/logout", (req, res) => {
// //   res
// //     .clearCookie("token", {
// //       httpOnly: true,
// //       secure: process.env.NODE_ENV === "production",
// //       sameSite: "none",
// //     })
// //     .status(200)
// //     .json({ message: "Logged out successfully" });
// // });

// // // Authenticated user profile
// // router.get("/me", verifyToken, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.userId).select("-password");
// //     if (!user) return res.status(404).json({ message: "User not found" });
// //     res.json(user);
// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const router = express.Router();
// const verifyToken = require("../middleware/verifyToken");

// const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1d" });

//     // This sets the cookie correctly for cross-site, HTTPS
//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: true, // Always true for Vercel/Render (HTTPS)
//         sameSite: "none", // Required for cross-site cookies
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .status(201)
//       .json({
//         message: "User registered successfully",
//         user: {
//           id: newUser._id,
//           name: newUser.name,
//           email: newUser.email,
//         },
//       });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({
//       error: "Registration failed",
//       ...(process.env.NODE_ENV === "development" && { details: error.message }),
//     });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

//     // This sets the cookie correctly for cross-site, HTTPS
//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: true, // Always true for Vercel/Render (HTTPS)
//         sameSite: "none", // Required for cross-site cookies
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .json({
//         message: "Login successful",
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       error: "Login failed",
//       ...(process.env.NODE_ENV === "development" && { details: error.message }),
//     });
//   }
// });

// // Logout
// router.post("/logout", (req, res) => {
//   res
//     .clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     })
//     .status(200)
//     .json({ message: "Logged out successfully" });
// });

// // Authenticated user profile (reads cookie, see verifyToken.js!)
// router.get("/me", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// // Static credentials
// const STATIC_USER = {
//   email: "raunaksingh142004@gmail.com",
//   password: "raunak.v.xiao", // this should be strong in real apps
//   name: "raunak"
// };

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (
//     email !== STATIC_USER.email ||
//     password !== STATIC_USER.password
//   ) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = jwt.sign({ id: "static", email: STATIC_USER.email }, JWT_SECRET, {
//     expiresIn: "1d",
//   });

//   res
//     .cookie("token", token, {
//       httpOnly: true,
//       secure: true, // true for HTTPS
//       sameSite: "none",
//       maxAge: 24 * 60 * 60 * 1000,
//     })
//     .json({
//       message: "Login successful",
//       user: {
//         id: "static",
//         name: STATIC_USER.name,
//         email: STATIC_USER.email,
//       },
//     });
// });

// // /me endpoint using the token
// const verifyToken = require("../middleware/verifyToken");
// router.get("/me", verifyToken, (req, res) => {
//   // Always return the static user (no DB)
//   res.json({
//     id: "static",
//     name: STATIC_USER.name,
//     email: STATIC_USER.email,
//   });
// });

// // Logout as before
// router.post("/logout", (req, res) => {
//   res
//     .clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     })
//     .status(200)
//     .json({ message: "Logged out successfully" });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// // Change these to whatever credentials you want
// const STATIC_USER = {
//   email: "raunaksingh142004@gmail.com",
//   password: "Palak" // set your password here
// };

// router.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   if (email === STATIC_USER.email && password === STATIC_USER.password) {
//     // On success, just return some data (no cookies, no JWT)
//     return res.json({
//       message: "Login successful",
//       user: {
//         email: STATIC_USER.email,
//         name: "Raunak Singh"
//       }
//     });
//   }
//   return res.status(401).json({ error: "Invalid credentials" });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

// Static (predefined) credentials
const STATIC_USER = {
  email: "raunaksingh.com",
  password: "raunak.raunak", // Set any password you want
  name: "Admin User"
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === STATIC_USER.email && password === STATIC_USER.password) {
    return res.json({
      message: "Login successful",
      user: {
        email: STATIC_USER.email,
        name: STATIC_USER.name
      }
    });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
