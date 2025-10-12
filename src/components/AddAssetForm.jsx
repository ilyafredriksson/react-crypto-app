import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Form,
  Divider,
  Button,
  InputNumber,
  DatePicker,
  Result,
  Card,
  Avatar
} from "antd";
import { CheckCircleOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import { useCrypto } from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onSuccess }) {
  const [form] = Form.useForm();
  const { crypto, addAsset, addTransaction } = useCrypto();
  const [submitted, setSubmitted] = useState(false);
  const [coin, setCoin] = useState(null);
  const assetRef = useRef();
  const onClose = () => {
    setSubmitted(false);
    form.resetFields();
    setCoin(null);
    if (typeof onSuccess === "function") onSuccess();
  };

  if (submitted) {
    const amount = form.getFieldValue("amount") ?? assetRef?.current?.amount ?? 0;
    const price = form.getFieldValue("price") ?? assetRef?.current?.price ?? 0;
    return (
      <Result
        status="success"
        title="Asset Added Successfully!"
        subTitle={`Added ${amount} ${coin?.name || ""} at $${price} to your portfolio.`}
        extra={[
          <Button type="primary" key="close" onClick={onClose} size="large">
            Close
          </Button>,
        ]}
      />
    );
  }
   
   



  if (!crypto || crypto.length === 0) return <div>Loading...</div>;

  if (!coin) {
    return (
      <div style={{ padding: '24px' }}>
        <Card style={{
          border: '2px dashed #d9d9d9',
          borderRadius: '12px',
          background: '#fafafa',
          textAlign: 'center',
          padding: '32px'
        }}>
          <Typography.Title level={4} style={{ color: '#8c8c8c', marginBottom: '16px' }}>
            Select Cryptocurrency
          </Typography.Title>
          <Select
            style={{ width: '100%', maxWidth: '400px' }}
            size="large"
            onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
            placeholder="🔍 Choose a cryptocurrency to add..."
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={crypto.map((c) => ({
              label: (
                <Space>
                  <Avatar size="small" src={c.icon} />
                  <span style={{ fontWeight: '500' }}>{c.name}</span>
                  <span style={{ color: '#8c8c8c' }}>({c.symbol})</span>
                </Space>
              ),
              value: c.id,
            }))}
          />
        </Card>
      </div>
    );
  }
  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.toISOString ? values.date.toISOString() : new Date().toISOString(),
    };

    if (typeof addAsset === "function") addAsset(newAsset);
    
    if (typeof addTransaction === "function") {
      addTransaction({
        coinId: coin.id,
        amount: values.amount,
        price: values.price,
        date: newAsset.date,
        type: "buy"
      });
    }

    assetRef.current = newAsset;
    setSubmitted(true);
  }
  function handleAmountChange(value) {
    const price = form.getFieldValue("price") ?? coin.price ?? 0;
    const total = Number((Number(value || 0) * Number(price || 0)).toFixed(2));
    form.setFieldsValue({ total });
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount") ?? 0;
    const total = Number((Number(amount || 0) * Number(value || 0)).toFixed(2));
    form.setFieldsValue({ total });
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}>
        <CoinInfo coin={coin} withSymbol />
        <Divider />

        <Form
          form={form}
          name="add-asset"
          layout="vertical"
          style={{ maxWidth: '100%' }}
          initialValues={{
            price: Number(coin.price.toFixed(2)),
          }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            label={
              <Space>
                <DollarOutlined />
                <span>Amount</span>
              </Space>
            }
            name="amount"
            rules={[
              {
                required: true,
                type: "number",
                min: 0.000001,
                message: 'Please enter a valid amount'
              },
            ]}
          >
            <InputNumber
              placeholder="Enter amount to buy"
              style={{ width: "100%" }}
              size="large"
              onChange={handleAmountChange}
            />
          </Form.Item>

          <Form.Item 
            label={
              <Space>
                <DollarOutlined />
                <span>Price per unit</span>
              </Space>
            }
            name="price"
          >
            <InputNumber 
              onChange={handlePriceChange} 
              style={{ width: "100%" }}
              size="large"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item 
            label={
              <Space>
                <CalendarOutlined />
                <span>Date & Time</span>
              </Space>
            }
            name="date"
          >
            <DatePicker 
              showTime 
              style={{ width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item label="Total Value" name="total">
            <InputNumber 
              disabled 
              style={{ width: "100%" }}
              size="large"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: '32px' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button onClick={() => setCoin(null)} size="large">
                Back
              </Button>
              <Button type="primary" htmlType="submit" size="large" style={{
                background: 'linear-gradient(90deg, #1890ff 0%, #096dd9 100%)',
                border: 'none',
                fontWeight: '500'
              }}>
                Add to Portfolio
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
