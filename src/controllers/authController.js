const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
    // REGISTER
    async register(req, res) {
        try {
            const { name, lastname, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user)
                return res.status(404).json({ error: "Email già esistente" });
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, lastname, email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({
                message: "Utente creato con successo!",
                user: newUser,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // LOGIN
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user)
                return res.status(404).json({ error: "Utente non trovato" });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(401).json({ error: "Password errata" });
            const token = jwt.sign({ id: user._id, isVerify: user.is_Verified }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            res.status(200).json({ message: "Login riuscito", token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GETME
    async getMe(req, res) {
        try {
            const user = await User.findById(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = AuthController;
