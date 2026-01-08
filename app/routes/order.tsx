import {OrderItem} from "~/components/OrderItem";
import {useNavigate} from "react-router";


export function meta() {
    return [
        { title: "Order Page" },
        { name: "description", content: "Test order page" },
    ];
}

export default function Order() {
    const items = [
        {name: "Apple", price: 1.25, taxable: "F"},
        {name: "Banana", price: 0.50, taxable: "F"},
    ];

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate("/");
    }
    const handleProduceNoBarcode = () => {
        // TODO: create /produce route
        // navigate("/");
    }

    const subtotal = items.reduce((acc, item) => acc+item.price, 0);


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
                        backgroundColor: "#f2f2f2",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ textAlign: "center" }}>Order Number: 1</h3>
                        {/* Example items */}
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
                            {items.map((item, index) => (
                                <OrderItem
                                    key={index}
                                    name={item.name}
                                    price={`$${item.price.toFixed(2)}`}
                                    taxable={item.taxable}
                                />
                            ))}
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
                        <div>Subtotal</div>
                        <div>${subtotal.toFixed(2)}</div>
                    </div>
                </div>


                {/* Right column - Product Image + Category Buttons */}
                <div
                    style={{
                        flex: 1,
                        padding: "1rem",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
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
                        Please Scan Item
                    </div>
                    {/* Product Image */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                        }}
                    >
                        <img
                            src="https://via.placeholder.com/250"
                            alt="Product"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </div>

                    {/* Category Buttons */}
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button style={{ flex: 1, padding: "1rem" }}>Produce /<br/> No Barcode </button>
                        <button style={{ flex: 1, padding: "1rem" }}>Salt/Ice</button>
                        <button style={{ flex: 1, padding: "1rem" }}>Bakery</button>
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
                    style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: "#535668", color: "white", borderRight: "1px solid black" }}
                    onClick={handleGoBack}
                >
                    Back
                </button>
                <button
                    style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: "#535668", color: "white" , borderRight: "1px solid black"}}
                >
                    Cancel Items
                </button>
                <button
                    style={{ flex: 1, border: "none", cursor: "pointer", backgroundColor: "#535668", color: "white", borderRight: "1px transparent" }}
                >
                    Call Cashier
                </button>
                <div
                    style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#6f7594", color: "white", borderRight: "1px transparent" }}
                >
                    0.00{} lb
                </div>
                <button
                    style={{ flex: 2, border: "none", cursor: "pointer", backgroundColor: "#008b24", color: "white", fontSize: "1rem", borderRight: "1px solid white" }}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}
