import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES = "24h";

const createToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: TOKEN_EXPIRES,
    });
};

// register
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "all fields are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "invalid email" });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "password must be atleast 8 characters" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "user already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        const token = createToken(user._id);

        return res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

// login
export async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password."
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Incorrect username or password."
            });
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

// get current user 
export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select("name email");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        return res.json({ success: true, user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "server error" });
    }

}

//update user
export async function updateProfile(req, res) {
    const { name, email } = req.body;

    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "valid name and email required"
        });
    }

    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "unauthorized" });
    }

    try {
        const exists = await User.findOne({
            email,
            _id: { $ne: req.user.id }
        });

        if (exists) {
            return res.status(409).json({ success: false, message: "email already in use" });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        ).select("name email");

        return res.json({ success: true, user });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "server error" });
    }
}

//change password 
export async function updatePassword(req, res) {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password invalid or too short"
        });
    }

    if (!req.user || !req.user.id) {
        return res.status(401).json({
            success: false,
            message: "unauthorized"
        });
    }

    if (currentPassword === newPassword) {
        return res.status(400).json({
            success: false,
            message: "new password must be different"
        });
    }

    try {
        const user = await User.findById(req.user.id).select("password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        const match = await bcrypt.compare(currentPassword, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "incorrect password"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.json({
            success: true,
            message: "password changed"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "server error" });
    }
}