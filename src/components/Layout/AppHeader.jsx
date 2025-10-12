import React, { useState } from 'react';
import { Layout, Select, Space, Drawer, Button, Typography, Badge, Avatar } from 'antd';
import { PlusOutlined, WalletOutlined, HistoryOutlined, UserOutlined } from '@ant-design/icons';
import { useCrypto } from '../../context/crypto-context';
import AddAssetForm from '../AddAssetForm';
import CoinInfoModal from '../CoininfoModal';

const { Header } = Layout;

export default function AppHeader() {
  const { crypto, transactions = [] } = useCrypto();
  const [selectedCoin, setSelectedCoin] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Header style={{
      background: 'linear-gradient(90deg, #1890ff 0%, #096dd9 100%)',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: '64px'
      }}>
        {/* Logo & Brand */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <WalletOutlined style={{ fontSize: '28px', color: '#fff', marginRight: '12px' }} />
          <Typography.Title level={3} style={{ 
            margin: 0, 
            color: '#fff',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            CryptoFolio
          </Typography.Title>
        </div>

        {/* Center - Coin Selector */}
        <div style={{ flex: 1, maxWidth: '400px', margin: '0 32px' }}>
          <Select
            style={{ width: '100%' }}
            size="large"
            placeholder="🔍 Search cryptocurrencies..."
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={(value) => {
              const coin = crypto.find(c => c.id === value);
              setSelectedCoin(coin);
            }}
            options={crypto.map(c => ({
              value: c.id,
              label: (
                <Space>
                  <Avatar size="small" src={c.icon} />
                  <span style={{ fontWeight: '500' }}>{c.name}</span>
                  <span style={{ color: '#8c8c8c' }}>({c.symbol})</span>
                </Space>
              )
            }))}
          />
        </div>

        {/* Right Actions */}
        <Space size="large">
          <Badge count={transactions.length} size="small" overflowCount={99}>
            <Button 
              type="text" 
              icon={<HistoryOutlined />}
              style={{ 
                color: '#fff', 
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px'
              }}
            >
              History
            </Button>
          </Badge>
          
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setDrawerOpen(true)}
            style={{ 
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontWeight: '500',
              borderRadius: '8px'
            }}
          >
            Add Asset
          </Button>

          <Avatar 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)'
            }} 
          />
        </Space>
      </div>

      {/* Modals & Drawers */}
      <CoinInfoModal 
        coin={selectedCoin}
        open={!!selectedCoin}
        onClose={() => setSelectedCoin(null)}
      />

      <Drawer
        title={
          <Space>
            <PlusOutlined style={{ color: '#1890ff' }} />
            <span>Add New Asset</span>
          </Space>
        }
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={480}
        styles={{
          body: { padding: 0 }
        }}
      >
        <AddAssetForm onSuccess={() => setDrawerOpen(false)} />
      </Drawer>
    </Header>
  );
}
