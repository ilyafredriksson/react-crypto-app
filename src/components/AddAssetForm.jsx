import { useState } from "react";
import { Select, Space, Typography } from "antd";
import { useCrypto } from "../context/crypto-context";

export default function AddAssetForm() {
  const { crypto } = useCrypto();

  const [coin, setCoin] = useState(null);

  if (!crypto || crypto.length === 0) return <div>Loading...</div>;

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        placeholder="Select coin"
        options={crypto.map((c) => ({
          label: (
            <Space>
              {c.icon && <img src={c.icon} alt={c.name} style={{ width: 20 }} />}
              {c.name}
            </Space>
          ),
          value: c.id,
        }))}
      />
    );
  }

  return (
    <form>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </div>
    </form>
  );
}