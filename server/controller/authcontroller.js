import userModel from "../models/usermodel.js";
import { comparepassword, hashpassword } from "../helpers/authhelper.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registercontroller = async (req, res) => {
  try {
    const { name, email, password, question } = req.body;
    
    // Validations
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
    if (!question) return res.status(400).json({ message: "Answer to security question is required" });

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered, please login",
      });
    }

    // Hash password and save user
    const hashedPassword = await hashpassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      question,
    }).save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not registered",
      });
    }

    // Compare password
    const isMatch = await comparepassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Forgot Password Controller
export const forgotpasswordcontroller = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    
    // Validation
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!question) return res.status(400).json({ message: "Answer to security question is required" });
    if (!newPassword) return res.status(400).json({ message: "New password is required" });

    // Check if user exists and answer matches
    const user = await userModel.findOne({ email, question });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or answer to security question",
      });
    }

    // Hash new password and update user
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Test Controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
