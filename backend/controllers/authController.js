
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Counter from "../models/Counter.js";

// REGISTER USER
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;

        // 1. Check required fields
        if (!name || !email || !password || !location) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 8 characters"
            });
        }

        // 3. Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // 4. Check existing user
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // 5. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);



        // 6. Create user
        // const newUser = await User.create({
        //     name: name.trim(),
        //     email: normalizedEmail,
        //     password: hashedPassword,
        //     location: location.trim()
        // });

        // Generate the next permanent registration number
        const counter = await Counter.findOneAndUpdate(
            { _id: "userRegistration" },
            { $inc: { sequence: 1 } },
            { new: true, upsert: true }
        );

        // Create new user
        const newUser = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            location: location.trim(),
            registrationNumber: counter.sequence
        });


        // 7. Send response without password
        return res.status(201).json({
            success: true,
            message: "Registration successful",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                location: newUser.location,
                registrationNumber: newUser.registrationNumber
            }
        });

    } catch (error) {
        // Handle duplicate email index errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        console.error("Registration Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};




export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 2. Find user
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                location: user.location
            }
        });

    } catch (error) {
        // console.error("Login Error:", error.message);
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};
