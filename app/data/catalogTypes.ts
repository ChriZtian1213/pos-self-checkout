import type {LangText} from "~/state/LanguageContext";

export interface CatalogItem{
    name: LangText;
    plu: string
    price: number
    taxable: "T" | "F" | "TF" | ""
    image?: string
    category: "produce" | "bakery" | "misc"
}

