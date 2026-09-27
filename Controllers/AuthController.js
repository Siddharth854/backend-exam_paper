const bcrypt = require('bcrypt')
const UserModel = require("../Models/User")
const jwt = require('jsonwebtoken')
const connectDB = require('../Models/db');

const signup = async (req, res) => {
    try {
        await connectDB();

        const { name, email, password, role } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "USER already exist, you can login",
                success: false
            });
        }

        const userModel = new UserModel({
            name,
            email,
            password,
            role
        });

        userModel.password = await bcrypt.hash(password, 10);

        await userModel.save();

        res.status(201).json({
            message: "Signup Successfully",
            success: true
        });

    } catch (err) {
        console.error("SIGNUP ERROR:", err);

        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


    const login = async (req, res) => {
    try {
        await connectDB();

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        const errorMsg = "Authentication Failed Email or Password is wrong";

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                _id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '24h'
            }
        );

        res.status(200).json({
            message: "Login Successfully",
            success: true,
            jwtToken,
            email,
            name: user.name,
            role: user.role
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

module.exports = {
    signup,
    login
}
