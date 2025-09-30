import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fakeFetchCryptoData,fetchAssets } from "../../api";
import { percentDifference,capitalize } from "../utils";

const siderStyle ={
  padding: "1rem",
}


export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true);
      try {
        const { result } = await fakeFetchCryptoData();
        const fetchedAssets = await fetchAssets();

        const processedAssets = fetchedAssets.map((asset) => {
          const coin = result.find((c) => c.id === asset.id);

          if (!coin) {
            return {
              ...asset,
              grow: false,
              growPercent: 0,
              totalAmount: asset.amount * asset.price,
              totalProfit: 0,
            };
          }

          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
            price: coin.price,
          };
        });

        setAssets(processedAssets);
        setCrypto(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAssets([
          {
            id: "bitcoin",
            name: "Bitcoin",
            grow: true,
            growPercent: 12.5,
            totalAmount: 45000,
            totalProfit: 5000,
          },
          {
            id: "ethereum",
            name: "Ethereum",
            grow: true,
            growPercent: 20,
            totalAmount: 15000,
            totalProfit: 2500,
          },
        ]);
        setCrypto([
          { id: "bitcoin", name: "Bitcoin", price: 45000 },
          { id: "ethereum", name: "Ethereum", price: 3000 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    preload();
  }, []);

  if (loading) {
    return (
      <Spin
        fullscreen
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      />
    );
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
            //{ title: "Difference", value: asset.growPercent, withTag: true },
          ]}
          renderItem={(item) => (
            <List.Item>
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
                    {item.value.toFixed(2)}$
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


      {/*<Card key={assets.id} style={{ marginBottom: '1rem' }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>

      {/* Visa assets data istället för static data */}
      

      {/*<Card style={{ marginTop: '1rem' }}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>/*/}
      }
  