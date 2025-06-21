// Import required modules
const z = require('zod');
const { User } = require("../models/user");
const { Account } = require("../models/accounts")
const jwt = require("jsonwebtoken"); // To securely share information between client and server (e.g., Authentication, Authorization)
const bcrypt = require("bcrypt"); // A library to hash passwords.
require("dotenv").config();

// *** Signup Route ***

// Schema defined for input validation using zod
const signupSchema = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

exports.signup = async (req, res) => {
    // Validate inputs using zod
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your email and password."
        });
    }

    // Check if the username (email) already exists in the database
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
        return res.status(409).json({ // Conflict status for already taken username
            message: "Email already taken."
        });
    }

    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 salt rounds

    // Create a new user with the hashed password
    const newUser = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword
    });

    // Generate a JWT token containing the user's ID
    const userId = newUser._id;
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    // Send response with success message and token
    res.status(201).json({
        message: "User created successfully.",
        token: token
    });
};

// *** SignIn Route ***

const signInSchema = z.object({
    username: z.string().email(), // Username should be a valid email
    password: z.string().min(6)  // Password must be at least 6 characters long
});

exports.signin = async (req, res) => {
    // Validate inputs using zod
    const { success } = signInSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your email and password."
        });
    }

    // Find the user in the database by username (email)
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
        return res.status(404).json({ // Not found status if user doesn't exist
            message: "User not found."
        });
    }

    // Validate the password using bcrypt
    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ // Unauthorized status for invalid password
            message: "Incorrect password."
        });
    }

    // Generate a JWT token containing the user's ID
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);

    // Send response with success message and token
    res.status(200).json({
        success: true,
        message: "User logged in successfully.",
        token: token
    });
};