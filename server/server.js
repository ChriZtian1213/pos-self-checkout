import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();
const PORT = 3001;

// global middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// routes
app.use(authRoutes);

// fallback
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});