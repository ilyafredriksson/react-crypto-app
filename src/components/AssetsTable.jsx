import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    
    sortDirections: ["descend"],
  },
  {
    title: "Price,$",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
    
  },
];



export default function AssetsTable() {

const {assets} =useCrypto();
const data =assets.map((a)=>({
  key:a.id,
  name:a.name||a.id,
  price:a.price,
  amount:a.amount,
}));

  return <Table 
  columns={columns}
   dataSource={data}
    
    pagination={false}
     />;
}
