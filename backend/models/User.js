
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },
        registrationNumber: {
            type: Number,
            unique: true,
            sparse: true
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
