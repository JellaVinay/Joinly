
import User from "../models/User.js";

export const getUserCount = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        return res.status(200).json({
            success: true,
            totalUsers
        });

    } catch (error) {
        console.error("User Count Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to get user count"
        });
    }
};


export const getDashboardData = async (req, res) => {
    try {
        const user = req.user;

        // Total registered users
        const totalUsers = await User.countDocuments();

        // Users from the same location
        const locationCount = await User.countDocuments({
            location: {
                $regex: `^${user.location.trim()}$`,
                $options: "i"
            }
        });

        // Permanent registration number
        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                location: user.location,
                registrationNumber: user.registrationNumber
            },
            totalUsers,
            locationCount
        });

    } catch (error) {
        console.error("Dashboard Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to load dashboard"
        });
    }
};
