import React from 'react';
import { Card, List, Typography, Tag, Button, Avatar, Space, Empty, Divider } from 'antd';
import { DeleteOutlined, HistoryOutlined, ShoppingCartOutlined, RiseOutlined } from '@ant-design/icons';
import { useCrypto } from '../context/crypto-context';

const { Text } = Typography;

export default function TransactionHistory() {
  const { transactions = [], clearTransactions, crypto = [] } = useCrypto();

  const coinById = (id) => crypto.find(c => c.id === id) || { name: id, icon: null };

  const totalValue = transactions.reduce((sum, t) => sum + (t.amount * t.price), 0);

  return (
    <Card
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        height: 'fit-content'
      }}
      bodyStyle={{ padding: 0 }}
    >
      {/* Header */}
      <div style={{ 
        padding: '20px 24px', 
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px 12px 0 0',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space>
            <HistoryOutlined style={{ color: '#fff', fontSize: '20px' }} />
            <Text strong style={{ color: '#fff', fontSize: '18px' }}>
              Transaction History
            </Text>
          </Space>
          {transactions.length > 0 && (
            <Button 
              danger 
              size="small"
              icon={<DeleteOutlined />}
              onClick={clearTransactions}
              style={{ 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: '#fff',
                borderRadius: '6px'
              }}
            >
              Clear All
            </Button>
          )}
        </div>
        
        {transactions.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center' }}>
            <RiseOutlined style={{ color: 'rgba(255,255,255,0.8)', marginRight: '8px' }} />
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
              Total Value: <Text strong style={{ color: '#fff' }}>${totalValue.toFixed(2)}</Text>
            </Text>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ background: '#fff', borderRadius: '0 0 12px 12px' }}>
        {transactions.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <Empty 
              description={
                <Text type="secondary">No transactions yet</Text>
              }
              image={<ShoppingCartOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />}
            />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={[...transactions].reverse()}
            style={{ maxHeight: '400px', overflowY: 'auto' }}
            renderItem={(transaction, index) => {
              const coin = coinById(transaction.coinId);
              const date = new Date(transaction.date);
              const totalTxValue = transaction.amount * transaction.price;
              
              return (
                <>
                  <List.Item style={{
                    padding: '16px 24px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          src={coin.icon} 
                          size={44}
                          style={{ 
                            border: '2px solid #f0f0f0',
                            background: coin.icon ? 'transparent' : '#1890ff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        >
                          {!coin.icon && coin.name?.[0]?.toUpperCase()}
                        </Avatar>
                      }
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Space>
                            <Text strong style={{ fontSize: '16px', color: '#262626' }}>
                              {coin.name}
                            </Text>
                            <Tag 
                              color={transaction.type === 'buy' ? 'success' : 'error'}
                              style={{ 
                                borderRadius: '12px',
                                textTransform: 'capitalize',
                                fontWeight: '500',
                                border: 'none'
                              }}
                            >
                              {transaction.type}
                            </Tag>
                          </Space>
                          <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                            ${totalTxValue.toFixed(2)}
                          </Text>
                        </div>
                      }
                      description={
                        <div style={{ marginTop: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '14px' }}>
                              <strong>{transaction.amount}</strong> × ${Number(transaction.price).toFixed(2)}
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {date.toLocaleDateString()} • {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Text>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                  {index < transactions.length - 1 && <Divider style={{ margin: 0 }} />}
                </>
              );
            }}
          />
        )}
      </div>
    </Card>
  );
}
