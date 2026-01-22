import type {Language} from "~/state/LanguageContext";
type UIText = {
    // Home
    welcomeMain: string;
    welcomeSub: string;
    useBags: string;
    callCashier: string;
    language: string;
    bagsMessage: string;
    cashierMessage: string;

    // Order
    back: string;
    cancelItems: string;
    cancellingItem: string;
    payNow: string;
    subtotal: string;
    produceNoBarcode: string;
    saltIce: string;
    bakery: string;
    scanItem: string;
    order: string;
    each: string;
    ice: string;
    donut: string;
    mexicanPastry: string;
    bolillos: string;
    propaneExchange: string;
    propanePurchase: string;

    // Produce
    nameSearch: string;
    pluSearch: string;
    next: string;
    clear: string;
    enter: string;
};

export const text: Record<Language, UIText> = {
    en: {
        // Home
        welcomeMain: "Scan first item",
        welcomeSub: 'or touch screen to start',
        useBags: "Use my bags",
        callCashier: "Call Cashier",
        language: "Español",
        bagsMessage: "Please place your bags in the weighing area",
        cashierMessage: "Help is on the way!",

        // Order
        back: "Back",
        cancelItems: "Cancel Item",
        cancellingItem: "Press Item to Cancel",
        payNow: "Pay Now",
        subtotal: "Subtotal",
        produceNoBarcode: "Produce /\nNo Barcode",
        saltIce: "Salt / Ice",
        bakery: "Bakery",
        scanItem: "Please scan item",
        order: "Order ",
        each: "each",
        ice: "Ice",
        donut: "Donut",
        mexicanPastry: "Mexican Pastry",
        bolillos: "Bolillos",
        propaneExchange: "Propane Exchange",
        propanePurchase: "Propane Purchase (New)",

        // Produce
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
        cancellingItem: "Presione articulo para cancelar",
        payNow: "Pagar ahora",
        subtotal: "Subtotal",
        produceNoBarcode: "Producir /\nSin código de barras",
        saltIce: "Sal/Hielo",
        bakery: "Panadería",
        scanItem: "Por favor de ecanar  articulo",
        order: "Orden ",
        each: "cada uno",
        ice: "Hielo",
        donut: "Dona",
        mexicanPastry: "Pastelería Mexicana",
        bolillos: "Bolillos",
        propaneExchange: "Cambio de Propano",
        propanePurchase: "Compra de Propano (Nuevo)",

        nameSearch: "Buscar con nombre",
        pluSearch: "Buscar con PLU",
        next: "Siguiente",
        clear: "Borrar",
        enter: "Entrar",
    },
};