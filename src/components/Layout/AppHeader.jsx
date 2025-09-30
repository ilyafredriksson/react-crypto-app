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
          label: coin.name,
          value: coin.id,
          icon: coin.icon || "",
        }))}
        optionRender={(option) => (
          <Space>
            {option.icon && <img src={option.icon} alt={option.label} style={{ width: 20 }} />}
            {option.label}
          </Space>
        )}
      />
      <Button type="primary">Add Asset</Button>
    </Layout.Header>
  );
}
