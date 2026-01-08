import type { Route } from "./+types/home";
import {useNavigate} from "react-router";
import React, {useState} from "react";
import Popup from '../components/Popup';
import Order from "./order";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Welcome to POS Self-Checkout" },
        { name: "description", content: "Start your checkout here!" },
    ];
}

export default function Home() {
    const [language, setLanguage] = useState<"en" | "es">("en");
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const isPopupOpen = popupMessage !== null;
    const navigate = useNavigate();
    const text = {
        en: {
            welcomeMain: "Scan first item",
            welcomeSub: 'or touch screen to start',
            useBags: "Use my bags",
            callCashier: "Call cashier",
            language: "Español",
            bagMessage: "Please place your bags in the weighing area",
            cashierMessage: "Help is on the way!",
        },
        es: {
            welcomeMain: "Escanea el primer artículo",
            welcomeSub: 'o toca la pantalla para empezar',
            useBags: "Usa mis maletas",
            callCashier: "Llama al cajero",
            language: "Inglés",
            bagMessage: "Por favor, coloca tus maletas en la zona de pesaje",
            cashierMessage: "¡Ayuda viene en camino!",
        },
    };

    const handleUseBags = () => setPopupMessage(text[language].bagMessage);
    const handleCallCashier = () => setPopupMessage(text[language].cashierMessage);
    const handleLanguage = () => setLanguage(language === "en" ? "es" : "en");

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

                <button
                    style={{
                        flex: 1,
                        fontSize: "1rem",
                        border: "none",
                        borderRight: "1px solid white",
                        cursor: "pointer",
                        backgroundColor: "#0071ff",
                        color: "white",
                    }}
                    onClick={handleLanguage}
                >
                    {text[language].language}
                </button>
            </div>


            {popupMessage && <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />}
        </div>
    );
}
