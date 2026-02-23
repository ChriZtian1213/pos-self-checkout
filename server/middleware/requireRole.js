import { getSession } from "../sessions.js";

export function requireRole(...allowedRoles) {
    return (req, res, next) => {
        const sessionId = req.cookies.sessionId;
        const session = getSession(sessionId);

        if (!session || !allowedRoles.includes(session.role)) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }

        req.session = session;
        next();
    };
}