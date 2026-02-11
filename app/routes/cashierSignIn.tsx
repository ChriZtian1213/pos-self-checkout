import type {Route} from "./+types/cashierSignIn"
import {QwertyKeyboard} from "~/components/Keyboard";
import {useNavigate} from "react-router";
import {useState} from "react";
import {Numpad} from "~/components/Numpad";
import {FullKeyboard} from "~/components/FullKeyboard";

export function meta({}: Route.MetaArgs){
    return [
        {title: "Cashier Sign-In"}
    ]
}

export default function CashierSignIn() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [activeField, setActiveField] =
        useState<"username" | "password">("username");

    const handleLoginKeyPress = (key: string) => {
        if (key === "enter") {
            if (activeField === "username") {
                setActiveField("password");
            } else {
                console.log("hi!");
            }
            return;`m`
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

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f2f2f2",
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
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem",
                    backgroundColor: "#ddd",
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
                    style={{ flex: 1 }}
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                <button
                    style={{
                        flex: 2,
                        backgroundColor: "#008b24",
                        color: "white",
                        fontSize: "1.2rem",
                        border: "none",
                    }}
                    onClick={() => {
                        // TODO: validate login
                        console.log(username, password);
                    }}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}