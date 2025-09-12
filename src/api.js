import { cryptoAssets,cryptoData } from "./components/data"; 

export function fetchCryptoData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData);
        }, 2000);
    });
}


export function fetchAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets);
        }, 2000);
    });
}