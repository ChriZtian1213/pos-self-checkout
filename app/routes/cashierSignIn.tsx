import type {Route} from "./+types/cashierSignIn"

export function meta({}: Route.MetaArgs){
    return [
        {title: "Cashier Sign-In"}
    ]
}

export default function CashierSignIn(){
    return (
        <div style={{
            backgroundColor: "yellow",
            height: "100vh",
            width: "100vw",
        }}
        >
            hi!
        </div>
    );
}