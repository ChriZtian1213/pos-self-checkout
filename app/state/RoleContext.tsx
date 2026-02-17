import React, {useState} from "react";

export type Role = "customer" | "cashier" | "manager";

const RoleContext = React.createContext<RoleContextValue | null>
                                                                        (null);
interface RoleContextValue {
    role: Role;
    setRole: (role: Role) => void;
    isCustomer: boolean;
    isCashier: boolean;
    isManager: boolean;
}

export const RoleProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [role, setRole] = useState<Role>("customer");
    const value: RoleContextValue = {
        role,
        setRole,
        isCustomer: role === "customer",
        isCashier: role === "cashier",
        isManager: role === "manager"
    };
    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => {
    const ctx = React.useContext(RoleContext);
    if (!ctx) {
        throw new Error("useRole must be used within RoleProvider");
    }
    return ctx;
};