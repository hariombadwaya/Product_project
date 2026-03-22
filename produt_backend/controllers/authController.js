const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
  async function register(req, res){
    try {
        const { email, password } = req.body;

        // check user exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user
        user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ msg: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// LOGIN
 async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,     
            secure: false,      
            
        });

        res.json({
            msg: "Login successful"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


 async function logout(req, res) {
    res.clearCookie("token");
    res.json({ msg: "Logged out" });
};

module.exports = {
    register,
    login,
    logout
}