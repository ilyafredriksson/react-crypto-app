import { useState } from "react";
import { Select, Space } from "antd";
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

  return <h2>ADD ASSET for {coin.name}</h2>;
}