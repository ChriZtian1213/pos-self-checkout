import {useMemo, useState} from "react";
import {produce} from "~/data/produce";
import {useNavigate} from "react-router";
import {ProduceGrid} from "~/components/ProduceGrid";
import {Numpad} from "~/components/Numpad";
import {QwertyKeyboard} from "~/components/Keyboard";
import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";
import {ItemQuantityPopup} from "~/components/ItemQuantityPopup";
import {useOrder} from "~/state/OrderContext";
import type {CatalogItem} from "~/data/catalogTypes";

export function meta(){
    return [
        { title: "Produce/No Barcode"},
    ]
}

export default function ProduceNoBarcode(){
    const {language} = useLanguage();
    const buttonColor = "#535668";
    const navigate = useNavigate();
    const manageOrder = useOrder();
    const [isPlu, setIsPlu] = useState(true);
    const [currentInput, setCurrentInput] = useState("");
    const [selectedProduce, setSelectedProduce] = useState<CatalogItem | null>(null);
    const [quantityInput, setQuantityInput] = useState("");

    const MAX_QUANTITY_INPUT = 10;
    const qtyNumber = Number(quantityInput);
    const isQuantityValid =
        Number.isInteger(qtyNumber) &&
        qtyNumber > 0 && qtyNumber <= MAX_QUANTITY_INPUT;

    const produceArray = Object.values(produce);

    const findProduceByPlu = (plu: string) => {
        return produceArray.find(item => item.plu === plu);
    }

    const filteredProduce = produceArray.filter(item => {
        if (isPlu){
            return item.plu.startsWith(currentInput);
        } else {
            return item.name[language].toLowerCase().includes(currentInput.toLowerCase());
        }
    })

    const applyKey =(value: string, key: string) => {
        if (key === "⌫") return value.slice(0, -1);
        if (key === text[language].clear) return "";
        if (key === "SPACE") return value + " ";
        return value + key;
    }


    const handleKeyPress = (key: string) => {
        if (selectedProduce) {
            if (key === text[language].enter) {
                if (!isQuantityValid) return;
                setCurrentInput("");
                handleConfirmQuantity();
                return;
            }

            setQuantityInput(prev => applyKey(prev, key));
            return;
        }
        if (isPlu && key === text[language].enter) {
            const match = findProduceByPlu(currentInput);

            if (match) {
                setSelectedProduce(match);
                setCurrentInput("");
            }

            return;
        }

        setCurrentInput(prev => applyKey(prev, key));
    }

    const handleProduceSelect = (item: CatalogItem) => {
        setSelectedProduce(item);
        setQuantityInput("");
        setCurrentInput("");
        setIsPlu(true);
    }

    const handleConfirmQuantity = () => {
        manageOrder.addItem(
            {
                plu: selectedProduce!.plu,
                name: selectedProduce!.name,
                price: selectedProduce!.price,
                taxable: selectedProduce!.taxable,
                image: selectedProduce!.image,
                category: selectedProduce!.category,
            },
            qtyNumber
        );
        setSelectedProduce(null);
        setQuantityInput("");
        setCurrentInput("");
        navigate("/order")
    };

    const handleCancel = () => {
        setSelectedProduce(null);
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f2f2f2" }}>
            {/* Main content */}
            <div style={{ display: "flex", flex: 1, padding: "1rem", flexDirection: "row" }}>
                {/* Left column: grid + pagination */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
                    <div>
                    </div>
                    {selectedProduce? (
                        <ItemQuantityPopup item={selectedProduce} onConfirm={handleConfirmQuantity} onCancel={handleCancel} quantity={quantityInput} onQuantityChange={setQuantityInput} />
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
                            <QwertyKeyboard value={currentInput} onKeyPress={handleKeyPress} />
                        </div>
                    ) : (
                        <></>
                    )}

                </div>

                {/* Right column: numpad */}
                {isPlu ? (
                        <div>
                            <div style={{display: "flex", flexDirection: "column", marginLeft: "1rem", fontSize: 24, textAlign: "center", justifyContent: "center", backgroundColor: "blue", color: "white", height: "5rem", width: "20rem"}}>
                                Please enter PLU code
                            </div>
                            <Numpad value={currentInput}
                                    onKeyPress={handleKeyPress}
                            />
                        </div>
                ): (<></>)}

            </div>
            {/* Bottom row: Cancel / Name Search / lbs */}
            <div style={{
                display: "flex",
                width: "100%",
                height: "80px",
            }}>
                <button
                    style={{flex: 1, backgroundColor: buttonColor, color: "white", cursor: "pointer", borderRight: "1px solid black"}}
                    onClick={() => navigate("/order")}
                >
                    {text[language].back}</button>
                <button
                    onClick={() => {
                        setIsPlu(!isPlu);
                        setCurrentInput("");
                    }}
                    style={{
                        flex: 1,
                        backgroundColor: !selectedProduce ? buttonColor : "#9294A1" , color: "white", cursor: !selectedProduce ?  "pointer" : "", borderRight: "1px solid black"
                    }}
                    disabled={selectedProduce !== null}
                >
                    {isPlu ? text[language].nameSearch : text[language].pluSearch}</button>
                <div style={{flex: 1, display: "flex", color: "white", justifyContent: "center", alignItems: "center", backgroundColor: buttonColor}}>0.00 lbs</div>
            </div>
        </div>
    );
}


