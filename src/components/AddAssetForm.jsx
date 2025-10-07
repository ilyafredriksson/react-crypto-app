import { useState } from "react";
import {
  Select,
  Space,
  Typography,
  Form,
  Divider,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
    
  },
   number:{
    range:'${label} must be between ${min} and ${max}',
   }
};


export default function AddAssetForm() {
    const [form] = Form.useForm();
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
              {c.icon && (
                <img src={c.icon} alt={c.name} style={{ width: 20 }} />
              )}
              {c.name}
            </Space>
          ),
          value: c.id,
        }))}
      />
    );
  }
  function onFinish(values) {
    console.log("Finish:", values);
  }
function handleAmountChange(value){
    const price = form.getFieldValue('price')
    form.setFieldsValue({
        total: (value * price).toFixed(2),
    });
}
  function handlePriceChange(value){
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
        total: +(amount * value).toFixed(2),
    });
}




  return (
    <Form
        form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
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

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber placeholder="Enter coin amount"  style={{ width: "100%" }}
        onChange={handleAmountChange} />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
