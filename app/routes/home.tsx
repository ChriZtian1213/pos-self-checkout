import type { Route } from "./+types/home";
import {useLocation, useNavigate} from "react-router";
import React, {useState} from "react";
import Popup from '../components/Popup';
import {CustomerFunctions} from "~/services/CustomerFunctions";
import {text} from "~/i18n/text";
import {LanguageButton} from "~/components/LanguageButton";
import {useLanguage} from "~/state/LanguageContext";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Welcome to POS Self-Checkout" },
        { name: "description", content: "Start your checkout here!" },
    ];
}

export default function Home() {
    const {language} = useLanguage();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const isPopupOpen = popupMessage !== null;
    const navigate = useNavigate();
    const customerFunctions = new CustomerFunctions(setPopupMessage, language)

    const handleUseBags = () =>
        customerFunctions.useBags()

    const handleCallCashier = () =>
        customerFunctions.callCashier();

    const handleStart = () => {
        if (isPopupOpen) return;
        navigate("/order");
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#2ba54b",
                color: "white",
                cursor: "pointer",
            }}
            onClick={handleStart} // whole screen acts as touch-to-start
        >
            <div
                style={{
                    marginTop: "35vh",

                }}
            >
                <div style={{fontSize: "3rem" }}>
                    {text[language].welcomeMain}
                </div>
                <div style={{fontSize: "1.5rem" }}>
                    {text[language].welcomeSub}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "80px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    style={{
                        flex: 1,
                        fontSize: "1rem",
                        border: "none",
                        borderRight: "1px solid white",
                        cursor: "pointer",
                        backgroundColor: "#525668",
                        color: "white",
                    }}
                    onClick={handleUseBags}
                >
                    {text[language].useBags}
                </button>

                <button
                    style={{
                        flex: 1,
                        fontSize: "1rem",
                        border: "none",
                        borderRight: "1px solid white",
                        cursor: "pointer",
                        backgroundColor: "#525668",
                        color: "white",
                    }}
                    onClick={handleCallCashier}
                >
                    {text[language].callCashier}
                </button>
                <LanguageButton />
            </div>
            {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />}
        </div>
    );
}
