
import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Counter from "../models/Counter.js";

const migrateRegistrationNumbers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const users = await User.find({})
            .sort({ createdAt: 1, _id: 1 });

        let sequence = 0;

        for (const user of users) {
            if (!user.registrationNumber) {
                sequence++;

                user.registrationNumber = sequence;
                await user.save();
            } else {
                sequence = Math.max(sequence, user.registrationNumber);
            }
        }

        await Counter.findOneAndUpdate(
            { _id: "userRegistration" },
            { $max: { sequence } },
            { upsert: true, new: true }
        );

        console.log("Registration number migration completed.");
        console.log(`Users processed: ${users.length}`);

    } catch (error) {
        console.error("Migration failed:", error.message);
    } finally {
        await mongoose.disconnect();
    }
};

migrateRegistrationNumbers();
