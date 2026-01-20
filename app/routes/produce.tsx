import {useEffect, useState} from "react";
import {produce, type ProduceItem} from "~/data/produce";
import {useNavigate} from "react-router";
import {ProduceGrid} from "~/components/ProduceGrid";
import {Numpad} from "~/components/Numpad";
import {QwertyKeyboard} from "~/components/Keyboard";
import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";
import {ProduceQuantityPopup} from "~/components/ProduceQuantity";
import {ManageOrder} from "~/services/ManageOrder";
import {useOrder} from "~/state/OrderContext";

export function meta(){
    return [
        { title: "Produce/No Barcode"},
    ]
}

export default function ProduceNoBarcode(){
    const {language} = useLanguage();
    const navigate = useNavigate();

    const manageOrder = useOrder();

    const [isPlu, setIsPlu] = useState(true);
    const [currentInput, setCurrentInput] = useState("");
    const [selectedProduce, setSelectedProduce] = useState<ProduceItem | null>(null);
    const [quantityInput, setQuantityInput] = useState("");

    const produceArray = Object.values(produce);
    const filteredProduce = produceArray.filter(item => {
        if (isPlu){
            return item.plu.startsWith(currentInput);
        } else {
            return item.name[language].toLowerCase().includes(currentInput.toLowerCase());
        }
    })

    const handleProduceSelect = (item: ProduceItem) => {
        setSelectedProduce(item);
        setQuantityInput("");
    }

    const handleConfirmQuantity = () => {
        const qty = Number(quantityInput);
        if (!Number.isInteger(qty) || qty <= 0) return;

        manageOrder.addProduce(
            {
                plu: selectedProduce!.plu,
                name: selectedProduce!.name,
                price: selectedProduce!.price,
                taxable: selectedProduce!.taxable,
            },
            qty
        );
        setSelectedProduce(null);
        setQuantityInput("");
        setCurrentInput("");
    };

    const handleCancel = () => {
        setSelectedProduce(null);
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Main content */}
            <div style={{ display: "flex", flex: 1, padding: "1rem", flexDirection: "row" }}>
                {/* Left column: grid + pagination */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
                    {selectedProduce? (
                        <ProduceQuantityPopup item={selectedProduce} onConfirm={handleConfirmQuantity} onCancel={handleCancel} quantity={quantityInput} onQuantityChange={setQuantityInput} />
                        ) : (
                    <ProduceGrid
                        produceItems={filteredProduce}
                        onClick={handleProduceSelect}
                    />
                    )}
                    {!isPlu ? (
                        <div style={{
                            display: "flex", justifyContent: "center", paddingBottom: "5rem", alignItems: "center"
                        }}>
                            <QwertyKeyboard nameInput={currentInput} setNameInput={setCurrentInput} />
                        </div>
                    ) : (
                        <></>
                    )}

                </div>

                {/* Right column: numpad */}
                {isPlu ? (
                    <Numpad input={!selectedProduce ? currentInput : quantityInput}
                            setInput={!selectedProduce? setCurrentInput : setQuantityInput}
                            onEnter={!selectedProduce? undefined : handleConfirmQuantity}
                    />
                ): (<></>)}

            </div>
            {/* Bottom row: Cancel / Name Search / lbs */}
            <div style={{
                display: "flex",
                width: "100%",
                height: "80px",
            }}>
                <button
                    style={{flex: 1}}
                    onClick={() => navigate("/order")}
                >
                    {text[language].back}</button>
                <button
                    onClick={() => {
                        setIsPlu(!isPlu);
                        setCurrentInput("");
                    }}
                    style={{
                        flex: 1
                    }}
                    disabled={!!selectedProduce}
                >
                    {isPlu ? text[language].nameSearch : text[language].pluSearch}</button>
                <div style={{flex: 1, textAlign: "center", alignItems: "center"}}>0.00 lbs</div>
            </div>
        </div>
    );
}


