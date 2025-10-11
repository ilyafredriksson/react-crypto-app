import React from "react";
import { List, Card, Typography, Tag, Button, Avatar, Space, Empty } from "antd";
import { useCrypto } from "../context/crypto-context";

export default function TransactionHistory() {
  const { transactions = [], clearTransactions, crypto = [] } = useCrypto();

  const coinById = (id) => crypto.find((c) => c.id === id) || { name: id, icon: null };

  return (
    <Card
      title={<Typography.Text strong>Transaction history</Typography.Text>}
      bodyStyle={{ padding: 12 }}
      headStyle={{ padding: '12px 16px' }}
      extra={
        transactions.length > 0 && (
          <Button danger size="small" onClick={() => clearTransactions()}>
            Clear
          </Button>
        )
      }
    >
      {transactions.length === 0 ? (
        <Empty description={"No transactions yet"} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={transactions}
          renderItem={(t) => {
            const coin = coinById(t.coinId);
            const when = new Date(t.date).toLocaleString();
            return (
              <List.Item style={{ padding: '10px 8px' }}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={coin.icon} alt={coin.name} shape="square" />
                  }
                  title={
                    <Space size={8} align="center">
                      <Typography.Text strong>{coin.name}</Typography.Text>
                      <Tag color="blue" style={{ textTransform: 'capitalize' }}>
                        {t.type}
                      </Tag>
                    </Space>
                  }
                  description={
                    <Space direction="vertical" size={2}>
                      <div>
                        <Typography.Text>
                          <strong>{t.amount}</strong> @ {Number(t.price).toFixed(2)}$
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text type="secondary">{when}</Typography.Text>
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
}
