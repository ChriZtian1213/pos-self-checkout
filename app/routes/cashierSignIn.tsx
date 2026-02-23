import type {Route} from "./+types/cashierSignIn"
import {useNavigate, useLocation} from "react-router";
import {useState} from "react";
import {FullKeyboard} from "~/components/FullKeyboard";
import {useRole} from "~/state/RoleContext";

export function meta({}: Route.MetaArgs){
    return [
        {title: "Cashier Sign-In"}
    ]
}

export default function CashierSignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.from ?? "/";
    const {setRole} = useRole();

    const backgroundColor = "yellow";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [activeField, setActiveField] =
        useState<"username" | "password">("username");
    const [error, setError] = useState<string | null>(null);

    const handleLoginKeyPress = (key: string) => {
        if (key === "enter") {
            if (activeField === "username") {
                setActiveField("password");
            } else {
                attemptLogin();
            }
            return;
        }
        if (activeField === "username") {
            setUsername(prev => applyKey(prev, key));
        } else {
            setPassword(prev => applyKey(prev, key));
        }
    };

    const applyKey = (value: string, key: string) => {
        if (key === "⌫") return value.slice(0, -1);
        if (key === "clear" || key === "CLEAR") return "";
        if (key === "space") return value + " ";
        return value + key;
    };

    const attemptLogin = async () => {
        setError(null);
        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({username, password})
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Login failed.");
                return;
            }

            const meRes = await fetch("http://localhost:3001/me", {
                credentials: "include",
            });
            const meData = await meRes.json();
            setRole(meData.role);
            navigate(returnTo);
        } catch (err) {
            console.log(err);
            setError("Network error")
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: backgroundColor,
            }}
        >
            {/* Center content */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1.5rem",
                }}
            >
                <h2>Cashier Sign In</h2>

                {/* Username */}
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setActiveField("username")}
                    placeholder="Username"
                    style={{
                        width: "320px",
                        padding: "1rem",
                        fontSize: "1.2rem",
                        border:
                            activeField === "username"
                                ? "2px solid #008b24"
                                : "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />

                {/* Password */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveField("password")}
                    placeholder="Password"
                    style={{
                        width: "320px",
                        padding: "1rem",
                        fontSize: "1.2rem",
                        border:
                            activeField === "password"
                                ? "2px solid #008b24"
                                : "1px solid #ccc",
                        borderRadius: "6px",
                    }}
                />
                {error}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem",
                    backgroundColor: "#3e414e",
                    maxHeight: "50vh",
                    alignItems: "center",
                    paddingBottom: "1rem",
                }}
            >
                <FullKeyboard value={activeField === "username" ? username : password} onKeyPress={handleLoginKeyPress} mask={activeField === "password"}/>
            </div>


            {/* Bottom bar */}
            <div
                style={{
                    height: "80px",
                    display: "flex",
                    borderTop: "1px solid #ccc",
                }}
            >
                <button
                    style={{ flex: 1, backgroundColor: "#535768", color: "white", borderRight: "1px solid black", cursor: "pointer" }}
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                <button
                    style={{
                        flex: 2,
                        color: "white",
                        fontSize: "1.2rem",
                        border: "none",
                        backgroundColor: "#535768"
                    }}
                    onClick={() => {
                        // TODO: validate login
                        console.log(username, password);
                    }}
                >

                </button>
            </div>
        </div>
    );
}