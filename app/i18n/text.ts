import type {Language} from "~/state/LanguageContext";
type UIText = {
    welcomeMain: string;
    welcomeSub: string;
    useBags: string;
    callCashier: string;
    language: string;
    bagsMessage: string;
    cashierMessage: string;

    back: string;
    cancelItems: string;
    payNow: string;
    subtotal: string;
    produceNoBarcode: string;
    saltIce: string;
    bakery: string;
    scanItem: string;
    order: string;

    nameSearch: string;
    pluSearch: string;
    next: string;
    clear: string;
    enter: string;
};

export const text: Record<Language, UIText> = {
    en: {
        welcomeMain: "Scan first item",
        welcomeSub: 'or touch screen to start',
        useBags: "Use my bags",
        callCashier: "Call cashier",
        language: "Español",
        bagsMessage: "Please place your bags in the weighing area",
        cashierMessage: "Help is on the way!",

        back: "Back",
        cancelItems: "Cancel Item",
        payNow: "Pay Now",
        subtotal: "Subtotal",
        produceNoBarcode: "Produce /\nNo Barcode",
        saltIce: "Salt / Ice",
        bakery: "Bakery",
        scanItem: "Please scan item",
        order: "Order ",

        nameSearch: "Name Search",
        pluSearch: "PLU Search",
        next: "Next",
        clear: "Clear",
        enter: "Enter",
    },
    es: {
        welcomeMain: "Escanea el primer artículo",
        welcomeSub: 'o toca la pantalla para empezar',
        useBags: "Usa mis maletas",
        callCashier: "Llama al cajero",
        language: "Inglés",
        bagsMessage: "Por favor, coloca tus maletas en la zona de pesaje",
        cashierMessage: "¡Ayuda viene en camino!",

        back: "Atrás",
        cancelItems: "Cancelar artículo",
        payNow: "Pagar ahora",
        subtotal: "Subtotal",
        produceNoBarcode: "Producir /\nSin código de barras",
        saltIce: "Sal/Hielo",
        bakery: "Panadería",
        scanItem: "Por favor escanee el articulo",
        order: "Orden ",

        nameSearch: "Buscar con nombre",
        pluSearch: "Buscar con PLU",
        next: "Siguiente",
        clear: "Borrar",
        enter: "Entrar",
    },
};