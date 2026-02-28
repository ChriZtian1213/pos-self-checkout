import express from "express";
import {
    createSession,
    getSession,
    deleteSession
} from "../sessions.js";
import { requireRole } from "../middleware/requireRole.js";

const router = express.Router();

/**
 * GET /ping
 */
router.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

/**
 * POST /login
 */
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "123" && password === "000") {
        const sessionId = createSession("cashier");

        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            sameSite: "lax"
        });

        res.json({ success: true });
        return;
    }

    res.status(401).json({ error: "Invalid credentials" });
});

/**
 * GET /me
 * Used by React to decide which buttons to show
 */
router.get("/me", (req, res) => {
    const sessionId = req.cookies.sessionId;
    const session = getSession(sessionId);

    if (!session) {
        res.json({ role: "customer" });
        return;
    }

    res.json({ role: session.role });
});

/**
 GET /
 **/
router.get("/", (req, res) => {
   res.json({message: "Hi there!"});
});

/**
 * POST /logout
 */
router.post("/logout", (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId){
        deleteSession(sessionId);
        res.clearCookie("sessionId");
    }
    res.json({ success: true });
});

/**
 * Example protected action (cashier or manager)
 */
router.post(
    "/change-price",
    requireRole("cashier", "manager"),
    (req, res) => {
        res.json({ success: true });
    }
);

export default router;