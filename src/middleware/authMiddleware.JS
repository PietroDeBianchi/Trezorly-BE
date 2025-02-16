const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Accesso negato" });
    try {
        const verified = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.JWT_SECRET,
        );
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token non valido" });
    }
};

module.exports = authMiddleware;