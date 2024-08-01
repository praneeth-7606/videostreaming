import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }

    const splitToken = token.split(' ')[1];

    if (!splitToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format',
      });
    }

    console.log('Token:', splitToken); // Debugging log

    const decode = jwt.verify(splitToken, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log('Decoded Token:', decode);

    // Fetch the user from the database
    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Debugging log
    res.status(401).json({
      success: false,
      message: 'Invalid token or unauthorized access',
    });
  }
};


// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
