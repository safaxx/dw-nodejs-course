import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const match = authHeader?.match(/^Bearer\s+([^\s]+)$/);
    if (!match) {
        return res.status(401).json({ error: "No token provided." });
    }

    const token = match[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
}

