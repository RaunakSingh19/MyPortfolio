// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET;

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = await User.create({ name, email, password: hashedPassword });
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: 'User already exists or invalid data' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
//   res.cookie('token', token, {
//     httpOnly: true,
//     sameSite: 'Lax',
//   }).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
// });

// // Logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('token').json({ message: 'Logged out successfully' });
// });

// // Protected route example
// router.get('/profile', async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ error: 'Unauthorized' });

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     res.json(user);
//   } catch {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// });

// module.exports = router;
