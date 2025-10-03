import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function AppHeader() {
  const { crypto } = useCrypto();

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        placeholder="Press to open"
        optionLabelProp="label"
        onChange={handleChange}
        options={crypto.map((coin) => ({
          label: (
            <Space>
              {coin.icon && (
                <img src={coin.icon} alt={coin.name} style={{ width: 20 }} />
              )}
              {coin.name}
            </Space>
          ),
          value: coin.id,
        }))}
      />
      <Button type="primary">Add Asset</Button>
    </Layout.Header>
  );
}
