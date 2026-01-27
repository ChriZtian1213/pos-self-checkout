import type {Route} from "./+types/cashierSignIn"
import {useLanguage} from "~/state/LanguageContext";
import {useState} from "react";
import {Form} from "react-router"
import {QwertyKeyboard} from "~/components/Keyboard";
import {Numpad} from "~/components/Numpad";
import {text} from "~/i18n/text";

export function meta({}: Route.MetaArgs){
    return [
        {title: "Cashier Sign-In"}
    ]
}

export default function CashierSignIn(){
    const {language} = useLanguage();
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [activeField, setActiveField] = useState<"loginId" | "password">("loginId")

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "yellow",
            height: "100vh",
            width: "100vw",
            justifyContent: "space-between",
        }}
        >
            <Form method="post">
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2rem", // space between loginId and password
                    paddingTop: "2rem"
                }}
                >
                    <input
                        type="text"
                        name="loginId"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        onFocus={() => setActiveField("loginId")}
                        placeholder="Login ID"
                        style={{
                            width: "50%",         // makes the line not too long
                            border: "none",       // remove default border
                            borderBottom: "2px solid black", // show only the bottom line
                            outline: "none",      // remove focus outline
                            fontSize: "2rem",     // text size
                            textAlign: "center",  // center text
                            padding: "0.5rem 0",  // vertical padding only
                            backgroundColor: "transparent"
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setActiveField("password")}
                        placeHolder="Password"
                        style={{
                            width: "50%",         // makes the line not too long
                            border: "none",       // remove default border
                            borderBottom: "2px solid black", // show only the bottom line
                            outline: "none",      // remove focus outline
                            fontSize: "2rem",     // text size
                            textAlign: "center",  // center text
                            padding: "0.5rem 0",  // vertical padding only
                            backgroundColor: "transparent"
                        }}
                    />
                    <button type="submit" style={{
                        width: "50%",
                        backgroundColor: "grey",
                        padding: "2rem",
                        fontSize: "24px"
                    }}
                    >Sign In!</button>
                </div>
            </Form>
            <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "5rem"
            }}>
                <div style={{paddingTop: "8rem", transform: "scale(1.2)", paddingRight: "2wh"}}>
                    <QwertyKeyboard nameInput={activeField === "loginId" ? loginId : password}
                                    setNameInput={(val) => {
                                        if (activeField === "loginId") setLoginId(val);
                                        else if (activeField === "password") setPassword(val);
                                    }}
                                    hasInputBox={false}
                    />
                </div>
                <div style={{transform: "scale(.8)"}}>
                    <Numpad input={activeField==="loginId" ? loginId : password}
                            setInput={(val) => {
                                if (activeField === "loginId") setLoginId(val);
                                else if (activeField === "password") setPassword(val);
                            }}
                            hasInputBox={false}
                            hasEnter={false}
                    />
                </div>
            </div>
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100px",

            }}
            >
                <button
                    style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: "#535668", color: "white", borderRight: "1px solid black" }}
                >
                    {text[language].back}
                </button>
            <div
                style={{ flex: 5, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#6f7594", color: "white", borderRight: "1px transparent" }}
            >
            </div>
        </div>
    </div>
    );
}