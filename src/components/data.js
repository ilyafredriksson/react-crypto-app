//https://openapi.coinstats.app/

export const cryptoData={
result:[
  {

  "id": "bitcoin",
  "icon": "https://static.coinstats.app/coins/1650455588819.png",
  "name": "Bitcoin",
  "symbol": "BTC",
  "rank": 1,
  "price": 43250.75,
  "priceBtc": 1,
  "volume": 15420000000,
  "marketCap": 847350000000,
  "availableSupply": 19600000,
  "totalSupply": 21000000,
  "fullyDilutedValuation": 907500000000,
  "priceChange1h": 0.75,
  "priceChange1d": 2.15,
  "priceChange1w": -1.42,
  "websiteUrl": "https://bitcoin.org",
  "redditUrl": "https://reddit.com/r/bitcoin",
  "twitterUrl": "https://twitter.com/bitcoin",
  "contractAddress": "0xa0b86a33e6776e2e09e384b0c92fceaade8fa82f",
  "contractAddresses": [
    {
      "blockchain": "ethereum",
      "contractAddress": "0xa0b86a33e6776e2e09e384b0c92fceaade8fa82f"
    }
  ],
  "decimals": 18,
  "explorers": [
    "https://blockstream.info"
  ],
  "liquidityScore": 85.5,
  "volatilityScore": 42.3,
  "marketCapScore": 95.8,
  "riskScore": 25.7,
  "avgChange": 1.25
}
]
}

export const cryptoAssets=[
  {
    id: 'bitcoin', 
    amount:0.02,
    price:43250.75,
    date: new Date(),
  },
  {
    id: 'ethereum', 
    amount:5,
    price:3000.50,
    date: new Date(), 
  },
]
  
