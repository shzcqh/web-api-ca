import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, msg: 'Token is invalid or expired.' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ success: false, msg: 'Authentication token is missing.' });
  }
};

// Get all users (protected route)
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: 'Failed to fetch users',
      error: error.message,
    });
  }
});

// Register/Create and Authenticate User
router.post('/', asyncHandler(async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ success: false, msg: 'Username and password are required.' });
    }
    if (req.query.action === 'register') {
      await registerUser(req, res);
    } else {
      await authenticateUser(req, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Internal server error.' });
  }
}));

// Update a user (protected route)
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    if (req.body._id) delete req.body._id; // Prevent changing the ID
    const result = await User.updateOne({ _id: req.params.id }, req.body);
    if (result.matchedCount) {
      res.status(200).json({
        code: 200,
        msg: 'User updated successfully.',
      });
    } else {
      res.status(404).json({
        code: 404,
        msg: 'User not found or update failed.',
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: 'Failed to update user.',
      error: error.message,
    });
  }
});

// Get current user profile (protected route)
router.get('/profile', authenticateJWT, asyncHandler(async (req, res) => {
  try {
    const user = await User.findByUserName(req.user.username);
    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found.' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'Failed to fetch user profile.', error: error.message });
  }
}));

// Helper functions
async function registerUser(req, res) {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ success: false, msg: 'Username and password are required.' });
  }

  try {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, msg: 'Username already exists.' });
    } else {
      res.status(500).json({ success: false, msg: 'Failed to create user.', error: error.message });
    }
  }
}

async function authenticateUser(req, res) {
  const user = await User.findByUserName(req.body.username);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token: 'BEARER ' + token });
  } else {
    res.status(401).json({ success: false, msg: 'Wrong password.' });
  }
}

export default router;
