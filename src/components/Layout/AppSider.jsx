import { Layout, Card, Statistic, List, Typography, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

// Mock functions - om api.js inte finns eller har fel
const fetchAssets = async () => {
  // Returnera mock data om den riktiga funktionen inte finns
  return [
    { id: 'bitcoin', amount: 1, price: 40000 },
    { id: 'ethereum', amount: 5, price: 2500 },
    { id: 'cardano', amount: 1000, price: 0.4 }
  ];
};

const percentDifference = (a, b) => {
  return ((b - a) / a) * 100;
};

const siderStyle = {
  padding: '1rem',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

// Mock function for crypto data fetching
async function fakeFetchCryptoData() {
  return {
    result: [
      { id: 'bitcoin', name: 'Bitcoin', price: 45000 },
      { id: 'ethereum', name: 'Ethereum', price: 3000 },
      { id: 'cardano', name: 'Cardano', price: 0.5 },
    ],
  };
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
        console.error('Error fetching data:', error);
        // Fallback till mock data vid error
        setAssets([
          { id: 'bitcoin', name: 'Bitcoin', grow: true, growPercent: 12.5, totalAmount: 45000, totalProfit: 5000 },
          { id: 'ethereum', name: 'Ethereum', grow: true, growPercent: 20, totalAmount: 15000, totalProfit: 2500 },
        ]);
        setCrypto([
          { id: 'bitcoin', name: 'Bitcoin', price: 45000 },
          { id: 'ethereum', name: 'Ethereum', price: 3000 },
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
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    );
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{ marginBottom: '1rem' }}>
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
      <List
        size="small"
        bordered
        dataSource={assets}
        renderItem={(asset) => (
          <List.Item>
            <Typography.Text mark>[{asset.name || asset.id}]</Typography.Text> 
            ${asset.totalAmount ? asset.totalAmount.toFixed(2) : '0.00'} 
            {asset.growPercent !== 0 && (
              <span style={{ color: asset.grow ? '#3f8600' : '#cf1322', marginLeft: '8px' }}>
                ({asset.grow ? '+' : ''}{asset.growPercent.toFixed(2)}%)
              </span>
            )}
          </List.Item>
        )}
      />

      <Card style={{ marginTop: '1rem' }}>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  );
}