import React from "react";
import { List, Card, Typography, Tag, Button } from "antd";
import { useCrypto } from "../context/crypto-context";

export default function TransactionHistory() {
  const { transactions = [], clearTransactions, crypto = [] } = useCrypto();

  const coinById = (id) => crypto.find((c) => c.id === id) || { name: id };

  return (
    <Card
      title="Transaction history"
      extra={
        transactions.length > 0 && (
          <Button danger size="small" onClick={() => clearTransactions()}>
            Clear
          </Button>
        )
      }
    >
      {transactions.length === 0 ? (
        <Typography.Text type="secondary">No transactions yet</Typography.Text>
      ) : (
        <List
          dataSource={transactions}
          renderItem={(t) => {
            const coin = coinById(t.coinId);
            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    <>
                      <strong>{coin.name}</strong> <Tag>{t.type}</Tag>
                    </>
                  }
                  description={
                    <>
                      {t.amount} @ {Number(t.price).toFixed(2)}$ — {new Date(t.date).toLocaleString()}
                    </>
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
