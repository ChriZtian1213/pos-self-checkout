import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";
import Popup from "~/components/Popup";

interface PopupConfig{
    message: string;
    onConfirm?: () => void;
}

interface PopupContextValue{
    showPopup: (config: PopupConfig) => void;
    closePopup: () => void;
    isOpen: boolean;
}

const PopupContext = createContext<PopupContextValue | null>(null);

export const PopupProvider: React.FC<{children: React.ReactNode}> = ({ children}) => {
    const [popup, setPopup] = useState<PopupConfig | null>(null);
    const location = useLocation();

    useEffect(() => {
        setPopup(null);
    }, [location.pathname]);

    const showPopup = (config: PopupConfig) => {
        setPopup(config);
    };

    const closePopup = () => {
        setPopup(null);
    }


    return (
        <PopupContext.Provider value={{showPopup, closePopup, isOpen: popup !== null}}>
            {children}
            {popup && (<Popup
                message={popup.message}
                onConfirm={popup.onConfirm}
                onCancel={() => setPopup(null)}
            />)}
        </PopupContext.Provider>
    )
}

export const usePopup = () => {
    const ctx = useContext(PopupContext);
    if (!ctx) {
        throw new Error("usePopup must be used within CallCashierProvider");
    }
    return ctx;
}

