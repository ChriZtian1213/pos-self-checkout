import React from "react";
import {useNavigate} from "react-router";

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({message, onClose}) => {
    const navigate = useNavigate();
    const handleCashierSignIn = () => {
        onClose();
        navigate("/cashierSignIn");
    }

    return (
        // Overlay — click outside cancels
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "yellow",
                    borderRadius: "4px",
                    minWidth: "420px",
                    maxWidth: "80vw",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                {/* Message */}
                <div
                    style={{
                        padding: "10rem",
                        color: "black",
                        fontSize: "1.5rem",
                    }}
                >
                    {message}
                </div>

                {/* Primary Action */}
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <button
                        onClick={handleCashierSignIn}
                        style={{
                            flex: 1,
                            padding: "1.5rem",
                            border: "none",
                            backgroundColor: "#008b24",
                            color: "white",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                        }}
                    >
                        Cashier Sign In
                    </button>

                    <button
                        onClick={onClose}
                        style={{
                            flex: 1,
                            padding: "1.5rem",
                            border: "none",
                            backgroundColor: "#21222A",
                            color: "white",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                            borderLeft: "1px solid #ccc",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;