import {OrderItem} from "~/components/OrderItem";
import {useLocation, useNavigate} from "react-router";
import {useState} from "react";
import {CustomerFunctions} from "~/services/CustomerFunctions";
import Popup from "~/components/Popup";
import {useLanguage} from "~/state/LanguageContext";
import {useOrder} from "~/state/OrderContext";
import {text} from "~/i18n/text";
import {bakery} from "~/data/bakery";
import {misc} from "~/data/misc";
import {usePopup} from "~/state/PopupContext";
import {useRole} from "~/state/RoleContext";



export function meta() {
    return [
        { title: "Order" },
    ];
}

export default function Order() {
    const {language} = useLanguage();
    const {isCustomer, logout} = useRole();
    const backgroundColor =  isCustomer ? "#f2f2f2" : "yellow";
    const {showPopup} = usePopup();
    const navigate = useNavigate();
    const [cancelMode, setCancelMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState<"none" | "produce" | "saltIce" | "bakery">("none");

    const {items, decrementItem, subtotal} = useOrder();
    const mostRecentItem = items[items.length - 1];

    const isOrderStarted = items.length > 0;
    const isBackEnabled = !isOrderStarted || activeCategory !== "none";

    const handleCancelItem = () => {
        if (isCustomer){
            handleCallCashier();
            return;
        }
        if (!isCustomer) {
            setCancelMode(prev => !prev);
        }
    }

    const handleGoBack = () => {
        if (activeCategory == "none") {
            navigate("/");
        } else setActiveCategory("none");
    }
    const handleProduceNoBarcode = () => {
        navigate("/produce");
    }

    const handleCallCashier = () => {
        showPopup({
            message: text[language].cashierMessage,
            onConfirm: () => {
                navigate("/cashierSignIn", {
                    state: { from: "/order" }
                });
            }
        });
    };


    const handlePayNow = () => {
        navigate("/pay");
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
                {/* Left column - Order List */}
                <div
                    style={{
                        flex: 1,
                        padding: "1rem",
                        backgroundColor: backgroundColor,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>
                        {text[language].order}</h3>
                    <div
                        style={{
                            flex: 1,
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            maxHeight: "73vh",
                        }}
                    >
                        <div>
                            {items.map((item) => {
                                const label = item.quantity > 1
                                    ? `${item.name[language]} ${item.quantity}x / @${item.unitPrice.toFixed(2)} ${text[language].each}`
                                    : item.name[language];
                                return(
                                <OrderItem
                                    key={item.plu}
                                    name={label}
                                    price={`$${(item.unitPrice*item.quantity).toFixed(2)}`}
                                    taxable={item.taxable}
                                    onSelect={
                                    cancelMode
                                        ? () => {
                                        decrementItem(item.plu)
                                        } : undefined
                                    }
                                />
                            )})}
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "1rem 0",
                            fontSize: "1.5rem",
                            color: "green",
                            borderTop: "1px solid gray",
                        }}
                    >
                        <div>{text[language].subtotal}</div>
                        <div>${subtotal.toFixed(2)}</div>
                    </div>
                </div>


                {/* Right column - Product Image + Category Buttons */}
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
                            display: "flex",
                            justifyContent: "center",
                            padding: "3rem",
                            backgroundColor: "#afbdc0",
                            color: "red",
                            fontSize: "1.5rem"
                        }}
                    >
                        {text[language].scanItem}
                    </div>
                    {/* Product Image */}
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            margin: "1rem",
                            maxHeight:
                                activeCategory === "saltIce" || activeCategory == "bakery" ? "30vh" : "60vh",
                        }}
                    >
                        <img
                            src={mostRecentItem?.image ? `/${mostRecentItem.category}Images/${mostRecentItem.image}` : "/pleaseScanItem.jpg"}
                            alt="Product"
                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                        />
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        {activeCategory === "none" || activeCategory === "produce" ? (
                            <>
                                <button
                                    style={{ flex: 1, padding: "1rem" }}
                                    onClick={() => handleProduceNoBarcode()}
                                >
                                    {text[language].produceNoBarcode}
                                </button>
                                <button
                                    style={{ flex: 1, padding: "1rem" }}
                                    onClick={() => setActiveCategory("saltIce")}
                                >
                                    {text[language].saltIce}
                                </button>
                                <button
                                    style={{ flex: 1, padding: "1rem" }}
                                    onClick={() => setActiveCategory("bakery")}
                                >
                                    {text[language].bakery}
                                </button>
                            </>
                        ) : null}

                        {activeCategory === "bakery" && (
                            <div
                                style={{
                                    flex: 1,
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gridTemplateRows: "repeat(3, 1fr)",
                                    gap: "0.5rem",
                                    width: "40vh",
                                    margin: "0 auto",
                                }}
                            >
                                <button
                                    style={{ flex: 1, padding: "1rem" }}
                                    onClick={() =>
                                        navigate("/addItem", {state: {item : bakery.donut}})}
                                >
                                    {text[language].donut}</button>
                                <button
                                    style={{ flex: 1, padding: "1rem" }}
                                    onClick={() =>
                                        navigate("/addItem", {state: {item : bakery.mexicanPastry}})}   
                                >
                                    {text[language].mexicanPastry}</button>
                                <button
                                    style={{ flex: 1, padding: "1rem", height: "10vh" }}
                                    onClick={() =>
                                        navigate("/addItem", {state: {item : bakery.bolillo}})}
                                >
                                    {text[language].bolillos}</button>
                            </div>
                        )}

                        {activeCategory === "saltIce" && (
                            <div
                                style={{
                                    flex: 1,
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gridTemplateRows: "repeat(3, 1fr)",
                                    gap: "0.5rem",
                                    width: "40vh",
                                    height: "30vh",
                                    margin: "0 auto",
                                }}
                            >
                                <button style={{ flex: 1, padding: "1rem" }}
                                        onClick={() =>
                                            navigate("/addItem", {state: {item : misc.ice}})}
                                >
                                    {text[language].ice}</button>
                                <button style={{ flex: 1, padding: "1rem" }}
                                        onClick={() =>
                                            navigate("/addItem", {state: {item : misc.propaneExchange}})}
                                >
                                    {text[language].propaneExchange}</button>
                                <button style={{ flex: 1, padding: "1rem" }}
                                        onClick={() =>
                                            navigate("/addItem", {state: {item : misc.propanePurchase}})}
                                >
                                    {text[language].propanePurchase}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom action buttons */}
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "80px",

                }}
            >
                <button
                    style={{flex: 1, border: "none", cursor: !isBackEnabled ? "" : "pointer", backgroundColor: !isBackEnabled ? "#9294A1" : "#535668", color: "white", borderRight: "1px solid black" }}
                    onClick={handleGoBack}
                    disabled={!isBackEnabled}
                >
                    {text[language].back}
                </button>
                <button
                    style={{ flex: 1, border: "none", cursor: !isOrderStarted ? "" : "pointer", backgroundColor: !isOrderStarted ? "#9294A1" : "#535668", color: "white" , borderRight: "1px solid black"}}
                    onClick={handleCancelItem}
                    disabled={!isOrderStarted}
                >
                    {cancelMode ? text[language].cancellingItem : text[language].cancelItems}
                </button>
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
                    style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#6f7594", color: "white", borderRight: "1px transparent" }}
                >
                    0.00{} lb
                </div>
                <button
                    onClick={handlePayNow}
                    style={{ flex: 2, border: "none", cursor: !isOrderStarted ? "" : "pointer", backgroundColor: !isOrderStarted ? "#9294A1" : "#008b24", color: "white", fontSize: "1rem", borderRight: "1px solid white" }}
                    disabled={!isOrderStarted}
                >
                    {text[language].payNow}
                </button>
            </div>
        </div>
    );
}
