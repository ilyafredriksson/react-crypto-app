import React from "react";
import { Typography } from "antd";

export default function CoinInfo({ coin, withSymbol = false, style = {} }) {
  if (!coin) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", ...style }}>
      {coin.icon && (
        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      )}
      <Typography.Title level={3} style={{ margin: 0 }}>
        {coin.name} {withSymbol ? <Typography.Text type="secondary">({coin.symbol})</Typography.Text> : null}
      </Typography.Title>
    </div>
  );
}