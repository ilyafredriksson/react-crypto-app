import { useState,useRef } from "react";
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
} from "antd";
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

export default function AddAssetForm() {
  const [form] = Form.useForm();
  const { crypto, addAsset, addTransaction } = useCrypto();
  const [submitted, setSubmitted] = useState(false);
  const [coin, setCoin] = useState(null);
  const assetRef  = useRef();
 
  const onClose = () => {
    setSubmitted(false);
    form.resetFields();
    setCoin(null);
  };

  if (submitted) {
    const amount = form.getFieldValue("amount") ?? assetRef?.current?.amount ?? 0;
    const price = form.getFieldValue("price") ?? assetRef?.current?.price ?? 0;
    return (
      <Result
        status="success"
        title="New Asset Added Successfully"
        subTitle={`Added ${amount} of ${coin?.name || ""} at price ${price} to your portfolio.`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }
   
   



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
    console.log(values)
  const newAsset = {
   id: coin.id,
   amount: values.amount,
   price: values.price,
   date: values.date?.$d ?? (values.date?.toDate ? values.date.toDate() : new Date()),
   };
    assetRef.current = newAsset;
    setSubmitted(true);
    if (typeof addAsset === "function") addAsset(newAsset);
    // record a transaction for the purchase
    if (typeof addTransaction === "function") {
      addTransaction({
        type: "buy",
        coinId: coin.id,
        amount: newAsset.amount,
        price: newAsset.price ?? coin.price,
        date: newAsset.date,
      });
    }
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

       <CoinInfo coin={coin} />
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
        <InputNumber
          placeholder="Enter coin amount"
          style={{ width: "100%" }}
          onChange={handleAmountChange}
        />
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
