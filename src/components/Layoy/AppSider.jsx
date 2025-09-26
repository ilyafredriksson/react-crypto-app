import { Layout, Card, Statistic, List, Typography, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAssets } from '../../api';

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

function percentDifference(a, b) {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

// Mock function for crypto data fetching
async function fakeFetchCryptoData() {
  return {
    result: [
      { id: 'bitcoin', name: 'Bitcoin', price: 45000 },
      { id: 'ethereum', name: 'Ethereum', price: 3000 },
      { id: 'cardano', name: 'Cardano', price: 0.5 },
    ]
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

        const processedAssets = fetchedAssets.map(asset => {
          const coin = result.find((c) => c.id === asset.id);
          
          if (!coin) {
            return {
              ...asset,
              grow: false,
              growPercent: 0,
              totalAmount: 0,
              totalProfit: 0,
            };
          }

          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
            price: coin.price
          };
        });

        setAssets(processedAssets);
        setCrypto(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    preload();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
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
      
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[ITEM]</Typography.Text> {item}
          </List.Item>
        )}
      />
      
      <Card>
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