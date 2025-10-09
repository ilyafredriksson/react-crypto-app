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

      // Build processed assets defensively in case a coin isn't found
      const processedAssets = (fetchedAssets || []).map((asset) => {
        const coin = result.find((c) => c.id === asset.id) || {};
        const coinPrice = typeof coin.price === "number" ? coin.price : asset.price ?? 0;
        const assetPrice = typeof asset.price === "number" ? asset.price : coinPrice;
        const amount = typeof asset.amount === "number" ? asset.amount : Number(asset.amount) || 0;

        return {
          ...asset,
          grow: assetPrice < coinPrice,
          growPercent: percentDifference(assetPrice, coinPrice),
          totalAmount: Number((amount * coinPrice).toFixed(2)),
          totalProfit: Number((amount * coinPrice - amount * assetPrice).toFixed(2)),
          price: coinPrice,
        };
      });

      setCrypto(result);
      setAssets(processedAssets);
      setLoading(false);
    }

    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => {
      const next = [...prev, newAsset];
      // map against latest crypto prices
      return next.map((asset) => {
        const coin = crypto.find((c) => c.id === asset.id) || {};
        const coinPrice = typeof coin.price === "number" ? coin.price : asset.price ?? 0;
        const amount = typeof asset.amount === "number" ? asset.amount : Number(asset.amount) || 0;
        return {
          ...asset,
          totalAmount: Number((amount * coinPrice).toFixed(2)),
          totalProfit: Number((amount * coinPrice - amount * (asset.price || coinPrice)).toFixed(2)),
          price: coinPrice,
          growPercent: percentDifference(asset.price ?? 0, coinPrice),
          grow: (asset.price ?? 0) < coinPrice,
        };
      });
    });
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

// Named export för hook
export function useCrypto() {
  return useContext(CryptoContext);
}
