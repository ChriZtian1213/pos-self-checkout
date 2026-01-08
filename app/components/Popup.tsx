import React from "react";

interface PopupProps {
    message: string;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({message, onClose}) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0,0,0,0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "1.5rem",
                textAlign: "center",
                padding: "2rem",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            {/* Popup Content*/}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: "#222",
                    padding: "2rem",
                    borderRadius: "8px",
                }}
            >
                {message}
            </div>
        </div>
    );
}

export default Popup;