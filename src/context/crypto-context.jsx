import { createContext, useEffect, useState, useContext } from "react";
import { fakeFetchCryptoData, fetchAssets } from "../api";
import { percentDifference } from "../components/utils";

export const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCryptoData();
      const fetchedAssets = await fetchAssets();

      const processedAssets = fetchedAssets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id);
        return {
          ...asset,
          grow: asset.price < coin.price,
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
          price: coin.price,
        };
      });

      setCrypto(result);
      setAssets(processedAssets);
      setLoading(false);
    }

    preload();
  }, []);

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets }}>
      {children}
    </CryptoContext.Provider>
  );
}

// Named export för hook
export function useCrypto() {
  return useContext(CryptoContext);
}
