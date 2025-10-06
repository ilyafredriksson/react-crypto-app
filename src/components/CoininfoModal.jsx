import { Tag, Typography, Divider } from "antd";

const fmt = (v) => (typeof v === "number" ? v.toFixed(2) + "%" : "N/A");
const color = (v) => (typeof v === "number" ? (v > 0 ? "green" : v < 0 ? "red" : "default") : "default");

export default function CoinInfoModal({ coin }) {
  if (!coin) return null;

  return (
    <>
      <Flex align="center">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name} <Typography.Text type="secondary">({coin.symbol})</Typography.Text>
        </Typography.Title>
      </div>
         </Flex>
      <Divider />

      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={color(coin.priceChange1h)}>{fmt(coin.priceChange1h)}

        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={color(coin.priceChange1d)}>{fmt(coin.priceChange1d)}
            
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={color(coin.priceChange1w)}>{fmt(coin.priceChange1d)}
            
        </Tag>
      </Typography.Paragraph>
        <Typography.Paragraph>
        <Typography.Text strong> Price: </Typography.Text>
            {coin.price.toFixed(2)} $
        </Typography.Paragraph>

        <Typography.Paragraph>
        <Typography.Text strong> Price BTC: </Typography.Text>
            {coin.priceBtc} 
        </Typography.Paragraph>

        <Typography.Paragraph>
        <Typography.Text strong> Market Cap: </Typography.Text>
            {coin.marketCap} 
        </Typography.Paragraph>

        <Typography.Paragraph>
        <Typography.Text strong> Contract Address: </Typography.Text>
            {coin.contractAddress}
        </Typography.Paragraph>
        


    </>
  );
}
