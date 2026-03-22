const jwt = require("jsonwebtoken");

async function authentication (req, res, next)  {
    const token = req.cookies.token; 


    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
};
module.exports =  authentication
