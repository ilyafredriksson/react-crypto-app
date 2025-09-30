import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fakeFetchCryptoData, fetchAssets } from "../../api";
import { percentDifference, capitalize } from "../utils";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto,setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);

      const {result} = await fakeFetchCryptoData();
      const fetchedAssets = await fetchAssets();

      // kombinera assets med cryptoData
      const processedAssets = fetchedAssets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id);

        if (!coin) {
          return {
            ...asset,
            grow: false,
            growPercent: 0,
            totalAmount: asset.amount * 0,
            totalProfit: 0,
          };
        }

        const buyPrice = asset.price ?? coin.price;

        return {
          ...asset,
          grow: buyPrice < coin.price,
          growPercent: percentDifference(buyPrice, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * buyPrice,
        };
      });

      setAssets(processedAssets);
      setLoading(false);
    }

    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total profit", value: asset.totalProfit },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
              { title: "Difference", value: asset.growPercent, withTag: true },
            ]}
            renderItem={(item) => (
              <List.Item style ={{display:'flex', justifyContent:'space-between'}}>
                <span>{item.title}:</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && !item.withTag && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {Number(item.value).toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
