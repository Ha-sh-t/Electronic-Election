import bcrypt from "bcrypt";
import UserModel from "./user.model.js";

export default class UserRepository {
    async get(email, password) {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return null; // User not found
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user; // Return the user if the password matches
        }

        return null; // Password mismatch
    }
    async add(userDetails) {
        // Hash the user's password before saving
        const saltRounds = 10; // Adjust salt rounds for desired security/performance balance
        const hashedPassword = await bcrypt.hash(userDetails.password, saltRounds);

        // Create the user with the hashed password
        const user = new UserModel({
            name: userDetails.name,
            email: userDetails.email,
            password: hashedPassword, // Store the hashed password
        });

        // Save the user in the database
        await user.save();
        return user;
    }
}
