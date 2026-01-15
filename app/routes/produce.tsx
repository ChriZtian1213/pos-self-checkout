import {useEffect, useState} from "react";
import {produce} from "~/data/produce";
import {useNavigate} from "react-router";
import {ProduceGrid} from "~/components/ProduceGrid";
import {Numpad} from "~/components/Numpad";
import {QwertyKeyboard} from "~/components/Keyboard";
import {useLanguage} from "~/state/LanguageContext";
import {text} from "~/i18n/text";

export function meta(){
    return [
        { title: "Produce/No Barcode"},
    ]
}

export default function ProduceNoBarcode(){
    const {language} = useLanguage();
    const navigate=useNavigate();
    const [isPlu, setIsPlu] = useState(true);
    const [currentInput, setCurrentInput] = useState("");
    const [page, setPage] = useState(0);
    const [pluInput, setPluInput] = useState("");


    useEffect(() => {
        setPage(0);
    }, [pluInput]);

    const producePerPage = 8;
    const produceArray = Object.values(produce);
    const filteredProduce = produceArray.filter(item => {
        if (isPlu){
            return item.plu.startsWith(currentInput);
        } else {
            return item.name[language].toLowerCase().includes(currentInput.toLowerCase());
        }
    })

    const produceItems = filteredProduce.slice(
        page * producePerPage,
        (page + 1) * producePerPage
    );

    const handleNext = () => {
        if ((page+1) * producePerPage < filteredProduce.length) {
            setPage(page+1);
        }
    }

    const handleBack = () => {
        if (page > 0){
            setPage(page-1);
        }
    }

    const handleCancel = () => {
        navigate("/order");
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{flex:1, textAlign: "center"}}>
                    Produce List
                </div>
                <div style={{flex: 1, textAlign: "center"}}>
                    Please enter PLU digit code
                </div>
            </div>
            {/* Main content */}
            <div style={{ display: "flex", flex: 1, padding: "1rem", flexDirection: "row" }}>
                {/* Left column: grid + pagination */}
                <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
                    <ProduceGrid
                        produceItems={produceItems}
                        language={language}
                        onNext={handleNext}
                        onBack={handleBack}
                        page={page} producePerPage={producePerPage} totalItems={filteredProduce.length}
                    />
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
                    <Numpad pluInput={currentInput} setPluInput={setCurrentInput} />
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
                    onClick={handleCancel}
                >
                    {text[language].back}</button>
                <button
                    onClick={() => {
                        setIsPlu(!isPlu);
                        setPage(0);
                        setCurrentInput("");
                    }}
                    style={{
                        flex: 1
                    }}
                >
                    {isPlu ? text[language].nameSearch : text[language].pluSearch}</button>
                <div style={{flex: 1, textAlign: "center", alignItems: "center"}}>0.00 lbs</div>
            </div>
        </div>
    );
}


