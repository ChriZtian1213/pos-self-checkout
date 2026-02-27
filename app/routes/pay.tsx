import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";
import {bakery} from "~/data/bakery";
import {misc} from "~/data/misc";
import {useOrder} from "~/state/OrderContext";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useRole} from "~/state/RoleContext";
import {usePopup} from "~/state/PopupContext";

export function meta() {
    return [
        {title: "Pay Now"}
    ];
}

export default function Pay(){
    const {language} = useLanguage();
    const {isCustomer, logout} = useRole();
    const {showPopup} = usePopup();
    const backgroundColor =  isCustomer ? "#f2f2f2" : "yellow";
    const navigate = useNavigate();
    const {total, subtotal, tax, snapSubtotal} = useOrder();
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | null>(null );
    const isCashSelected = paymentMethod === "cash";
    const isCardSelected = paymentMethod === "card";
    const paymentImageSrc =
        paymentMethod === "cash" ? "/payImages/paymentCash.jpg" :
            paymentMethod === "card" ? "/payImages/paymentCard.jpg" :
                "/payImages/paymentDefault.jpg"



    const handleCallCashier = () => {
        showPopup({
            message: text[language].cashierMessage,
            onConfirm: () => {
                navigate("/cashierSignIn", {
                    state: { from: "/pay" }
                });
            }
        });
    }

    const handleGoBack = () => {
        navigate("/order");
    }

    const handleCashPress = () => {
        setPaymentMethod(prev => (prev === "cash" ? null : "cash"))
    }
    const handleCardPress = () => {
        setPaymentMethod(prev => (prev === "card" ? null : "card"))

    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                fontFamily: "Inter, sans-serif",
            }}
        >
            {/* Top two columns */}
            <div style={{ display: "flex", flex: 1 }}>
                {/* LEFT COLUMN — Receipt / Summary */}
                <div
                    style={{
                        flex: 1,
                        padding: "1rem",
                        backgroundColor: backgroundColor,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            maxHeight: "73vh",
                        }}
                    >
                        {/* Receipt rows */}
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", borderBottom: "gray solid 1px", paddingBottom: ".5rem" }}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", borderBottom: "gray solid 1px", paddingBottom: ".5rem" }}>
                            <span>Taxes</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "1.4rem",
                                fontWeight: "bold",
                                borderBottom: "gray solid 1px", paddingBottom: ".5rem"
                            }}
                        >
                            <span>Order Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {/* SNAP section */}
                        <div style={{ marginTop: "1rem", fontWeight: "bold", color: "blue" }}>
                            Eligible Media
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", borderBottom: "gray solid 1px", paddingBottom: ".5rem", color: "blue" }}>
                            <span>SNAP</span>
                            <span>${snapSubtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Bottom summary (Amount Paid / Balance Due) */}
                    <div
                        style={{
                            marginTop: "auto",
                            borderTop: "1px solid gray",
                            paddingTop: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span>Amount Paid</span>
                            <span>$0.00</span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: "red",
                            }}
                        >
                            <span>Balance Due</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN — Image + Payment buttons */}
                <div
                    style={{
                        flex: 1,
                        padding: "1rem",
                        backgroundColor: backgroundColor,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Image area (matches order.tsx) */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "2rem",
                            backgroundColor: "#afbdc0",
                            color: "red",
                            fontSize: "1.5rem",
                            textAlign: "center",
                            height: "3rem"
                        }}
                    >
                        {paymentMethod === null ? "Please scan your coupons before selecting payment type" : paymentMethod === "cash" ? "Please insert cash below" : paymentMethod === "card" ? "Please proceed payment on Kiosk" : ""}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            margin: "1rem",
                            maxHeight: "60vh",
                        }}
                    >
                        <img
                            src={paymentImageSrc}
                            alt="Payment"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>

                    {/* CASH / CARD buttons side-by-side */}
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                        }}
                    >
                        <button
                            style={{
                                flex: 1,
                                padding: "1.5rem",
                                fontSize: "1.5rem",
                                backgroundColor: isCashSelected ? "#005115": isCardSelected ? "gray" : "#008b24",
                                color: "white",
                                border: "none",
                                cursor: isCardSelected ? "" : "pointer",
                                height: "105px"
                            }}
                            disabled={isCardSelected}
                            onClick={handleCashPress}
                        >
                            {paymentMethod === "cash" ? "Switch Payment" : "Cash"}
                        </button>

                        <button
                            style={{
                                flex: 1,
                                padding: "1.5rem",
                                fontSize: "1.5rem",
                                backgroundColor: isCardSelected ? "#003569" : isCashSelected ? "gray" : "#0055aa",
                                color: "white",
                                border: "none",
                                cursor: isCashSelected ? "" : "pointer",
                                overflow: "auto",
                                height: "105px"
                            }}
                            disabled={isCashSelected}
                            onClick={handleCardPress}
                        >
                            {paymentMethod === "card" ? "Switch Payment" : "Card"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom action bar (same as order.tsx) */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "80px",
                }}
            >
                <button
                    style={{
                        flex: 1,
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: "#535668",
                        color: "white",
                        borderRight: "1px solid black",
                    }}
                    onClick={handleGoBack}
                >
                    {text[language].back}
                </button>

                <button
                    style={{
                        flex: 1,
                        border: "none",
                        backgroundColor: "#535668",
                        borderRight: "1px solid black",
                    }}
                />

                {
                    isCustomer && (<button
                        style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: "#535668", color: "white", borderRight: "1px transparent" }}
                        onClick={handleCallCashier}
                    >
                        {text[language].callCashier}
                    </button>) ||

                    !isCustomer && (<button
                        style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: isCustomer ? "#535668" : "#0071ff", color: "white", borderRight: "1px transparent" }}
                        onClick={logout}
                    >
                        Exit Cashier Mode
                    </button>)
                }

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#6f7594",
                        color: "white",
                    }}
                >
                    0.00 lb
                </div>

                <button
                    style={{
                        flex: 2,
                        border: "none",
                        backgroundColor: "#535668",
                        color: "white",
                    }}
                    disabled
                />
            </div>
        </div>
    );
}