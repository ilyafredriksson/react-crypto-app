import React from 'react';
import { Layout, Row, Col, Card, Statistic, Typography } from 'antd';
import { RiseOutlined, FallOutlined, WalletOutlined, TrophyOutlined, DollarOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';
import TransactionHistory from '../TransactionHistory';

const { Content } = Layout;

const contentStyle = {
  padding: '24px',
  background: '#f5f5f5',
  minHeight: 'calc(100vh - 64px)'
};

export default function AppContent() {
  const { assets = [], crypto = [] } = useCrypto();

  // Calculate portfolio metrics
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price || 0;
    return acc;
  }, {});

  const totalValue = assets.reduce((sum, asset) => {
    const price = cryptoPriceMap[asset.id] || 0;
    return sum + (asset.amount || 0) * price;
  }, 0);

  const totalAssets = assets.length;
  const totalCoins = assets.reduce((sum, asset) => sum + (asset.amount || 0), 0);

  // Calculate 24h change (mock data - you can implement real logic)
  const portfolioChange = 2.45; // Mock percentage change

  return (
    <Content style={contentStyle}>
      {/* Portfolio Overview Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)'
            }}
          >
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>Total Portfolio Value</span>}
              value={totalValue}
              precision={2}
              prefix="$"
              valueStyle={{ color: '#fff', fontWeight: '700', fontSize: '32px' }}
              suffix={<WalletOutlined style={{ color: 'rgba(255,255,255,0.6)' }} />}
            />
            <div style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
              <RiseOutlined /> +{portfolioChange}% (24h)
            </div>
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card style={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <Statistic
              title="Total Assets"
              value={totalAssets}
              valueStyle={{ color: '#52c41a', fontWeight: '600', fontSize: '28px' }}
              prefix={<TrophyOutlined />}
              suffix="coins"
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={8}>
          <Card style={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}>
            <Statistic
              title="Holdings"
              value={totalCoins}
              precision={2}
              valueStyle={{ color: '#faad14', fontWeight: '600', fontSize: '28px' }}
              prefix={<DollarOutlined />}
              suffix="units"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card 
              title={
                <Typography.Title level={4} style={{ margin: 0, color: '#262626' }}>
                  📈 Portfolio Performance
                </Typography.Title>
              }
              style={{ 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}
            >
              <PortfolioChart />
            </Card>
            
            <Card 
              title={
                <Typography.Title level={4} style={{ margin: 0, color: '#262626' }}>
                  💼 Your Assets
                </Typography.Title>
              }
              style={{ 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                borderRadius: '12px',
                border: '1px solid #f0f0f0'
              }}
            >
              <AssetsTable />
            </Card>
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          <TransactionHistory />
        </Col>
      </Row>
    </Content>
  );
}

