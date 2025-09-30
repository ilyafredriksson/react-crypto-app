import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {  capitalize } from "../utils";
import {CryptoContext} from "../../context/crypto-context";
import {useContext} from "react";


const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
const { assets}= useContext(CryptoContext);

 
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total profit", value: asset.totalProfit },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
              { title: "Difference", value: asset.growPercent, withTag: true },
            ]}
            renderItem={(item) => (
              <List.Item >
                <span>{item.title}:</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent.toFixed(2)}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && !item.withTag && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {Number(item.value).toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
