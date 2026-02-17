import type { Route } from "./+types/home";
import {useLocation, useNavigate} from "react-router";
import React, {useState} from "react";
import Popup from '../components/Popup';
import {CustomerFunctions} from "~/services/CustomerFunctions";
import {text} from "~/i18n/text";
import {LanguageButton} from "~/components/LanguageButton";
import {useLanguage} from "~/state/LanguageContext";
import {useRole} from "~/state/RoleContext";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Welcome to POS Self-Checkout" },
        { name: "description", content: "Start your checkout here!" },
    ];
}

export default function Home() {
    const {language} = useLanguage();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [returnRoute, setReturnRoute] = useState<string | null>(null);
    const isPopupOpen = popupMessage !== null;
    const navigate = useNavigate();
    const location = useLocation();
    const customerFunctions = new CustomerFunctions(setPopupMessage, language);
    const {isCustomer, setRole} = useRole();
    const backgroundColor =  isCustomer ? "#2ba54b" : "yellow";
    const textColor = isCustomer ? "white" : "black";

    const handleUseBags = () =>
        customerFunctions.useBags()

    const handleCallCashier = () => {
        setReturnRoute(location.pathname);
        customerFunctions.callCashier();
    }

    const handleStart = () => {
        if (isPopupOpen) return;
        navigate("/order");
    };

    const handleExitCashierMode = () => {
        setRole("customer");
    }

    const handlePopupClose = () => {
        setPopupMessage(null);
        if (returnRoute){
            navigate("/cashierSignIn", {state: {from: returnRoute}});
            setReturnRoute(null);
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: backgroundColor,
                color: textColor    ,
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
                {!isCustomer && <button style={{
                    flex: 1,
                    fontSize: "1rem",
                    border: "none",
                    borderRight: "1px solid white",
                    cursor: "pointer",
                    backgroundColor: "#0071ff",
                    color: "white",
                }} onClick={handleExitCashierMode}
                >
                    {text[language].exitCashierMode}
                </button>}
            </div>
            {popupMessage && <Popup message={popupMessage} onClose={handlePopupClose}/>}
        </div>
    );
}
