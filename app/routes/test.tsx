import {ProduceGrid} from "~/components/ProduceGrid";
import { produce } from "~/data/produce";
import {useState} from "react";


export default function Test(){
    const [language, setLanguage] = useState<"en" | "es">("en");
    const [page, setPage] = useState(0);
    const [pluInput, setPluInput] = useState("");

    const producePerPage = 8;
    const produceArray = Object.values(produce);
    const filteredProduce = produceArray.filter(item =>
        item.plu.startsWith(pluInput)
    );

    const produceItems = filteredProduce.slice(
        page * producePerPage,
        (page + 1) * producePerPage
    );
    return(
        <div>
            <ProduceGrid produceItems={produceItems} language={language}/>
        </div>
    )
}