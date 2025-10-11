import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";
import TransactionHistory from "../TransactionHistory";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets = [], crypto = [] } = useCrypto();

  const cryptoPriceMap = (crypto || []).reduce((acc, c) => {
    if (c && c.id) acc[c.id] = Number(c.price) || 0;
    return acc;
  }, {});

  const total = (assets || []).reduce((sum, asset) => {
    const amount = typeof asset.amount === "number" ? asset.amount : Number(asset.amount) || 0;
    const price = (cryptoPriceMap[asset.id] ?? Number(asset.price)) || 0;
    return sum + amount * price;
  }, 0);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio: {Number(total).toFixed(2)}$
      </Typography.Title>

      <PortfolioChart />
  <TransactionHistory />
      <AssetsTable />
    </Layout.Content>
  );
}

