import {useEffect, useState} from "react";
import {produce} from "~/data/produce";
import {useNavigate} from "react-router";
import {ProduceGrid} from "~/components/ProduceGrid";
import {Numpad} from "~/components/Numpad";

export function meta(){
    return [
        { title: "Produce/No Barcode"},
    ]
}

export default function ProduceNoBarcode(){
    const navigate=useNavigate();
    const [language, setLanguage] = useState<"en"|"es">("en");

    const [page, setPage] = useState(0);
    const [pluInput, setPluInput] = useState("");

    const [nameSearchActive, setNameSearchActive] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [namePage, setNamePage] = useState(0);


    useEffect(() => {
        setPage(0);
    }, [pluInput]);

    const producePerPage = 8;
    const produceArray = Object.values(produce);
    const filteredPLU = produceArray.filter(item =>
        item.plu.startsWith(pluInput)
    );
    const produceItems = filteredPLU.slice(
        page * producePerPage,
        (page + 1) * producePerPage
    );

    const handleNext = () => {
        if ((page+1) * producePerPage < filteredPLU.length) {
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
            <div style={{ display: "flex", flex: 1, padding: "1rem", gap: "1rem" }}>
                {/* Left: Produce buttons */}
                <ProduceGrid produceItems={produceItems} language={language}/>
                <Numpad pluInput={pluInput} setPluInput={setPluInput}/>
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem", maxWidth: "64vh", minHeight: "5vh", paddingBottom: "5rem" }}>
                <button
                    style={{
                        flex: 1,
                        flexDirection: "row",

                    }}
                    onClick={handleBack}>Back</button>
                <button
                    style={{
                        flex: 1,
                    }}
                    onClick={handleNext}>Next</button>
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
                    Cancel</button>
                <button style={{flex: 1}}>Name Search</button>
                <div style={{flex: 1, textAlign: "center", alignItems: "center"}}>0.00 lbs</div>
            </div>
        </div>
    );
}


