type PopupSetter = (msg: string | null) => void;

export class CustomerFunctions {
    protected setPopup: PopupSetter;
    constructor(setPopup: PopupSetter) {
        this.setPopup = setPopup;
    }

    callCashier(){
        this.setPopup("Cashier is on the way");
    }

    switchLanguage(){

    }

}

export class CashierFunctions extends CustomerFunctions {

}