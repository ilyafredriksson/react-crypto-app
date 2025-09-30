import { createContext } from "react";

export const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
});

export function  CryptoContextProvider(){
    return <CryptoContext.Provider value>{children}</CryptoContext.Provider>
}