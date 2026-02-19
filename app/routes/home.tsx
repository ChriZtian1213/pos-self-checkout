import type { Route } from "./+types/home";
import {useLocation, useNavigate} from "react-router";
import React from "react";
import {text} from "~/i18n/text";
import {LanguageButton} from "~/components/LanguageButton";
import {useLanguage} from "~/state/LanguageContext";
import {useRole} from "~/state/RoleContext";
import {usePopup} from "~/state/PopupContext";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Welcome to POS Self-Checkout" },
        { name: "description", content: "Start your checkout here!" },
    ];
}

export default function Home() {
    const {language} = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const {showPopup} = usePopup();
    const {isCustomer, setRole} = useRole();
    const backgroundColor =  isCustomer ? "#2ba54b" : "yellow";
    const textColor = isCustomer ? "white" : "black";

    const handleCallCashier = () => {
        showPopup({
            message: text[language].cashierMessage,
            onConfirm: () => {
                navigate("/cashierSignIn", {
                    state: {from: location.pathname}
                })
            }
        });
    };

    const handleUseBags = () => {
        showPopup({
            message: text[language].bagsMessage
        })
    }

    const handleStart = () => {
        navigate("/order");
    };

    const handleExitCashierMode = () => {

        setRole("customer");
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
                {
                    isCustomer && (<button
                        style={{
                            flex: 1,
                            fontSize: "1rem",
                            border: "none",
                            borderRight: "1px solid white",
                            cursor: "pointer",
                            backgroundColor: isCustomer ? "#525668" : "#9294a1",
                            color: "white",
                        }}
                        onClick={handleCallCashier}
                        disabled={!isCustomer}
                    >
                        {text[language].callCashier}
                    </button>)
                    ||
                    !isCustomer && (<button
                        style={{
                            flex: 1,
                            fontSize: "1rem",
                            border: "none",
                            borderRight: "1px solid white",
                            cursor: "pointer",
                            backgroundColor: isCustomer ? "#535668" : "#0071ff",
                            color: "white",
                        }}
                        onClick={handleExitCashierMode}
                    >
                        Exit Cashier Mode
                    </button>)
                }


                <LanguageButton />

            </div>
        </div>
    );
}
