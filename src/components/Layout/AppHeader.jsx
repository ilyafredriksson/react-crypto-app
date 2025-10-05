import { Layout, Select, Space, Button } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { use } from "react";
import { useState,useEffect } from "react";

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
  const [select,setSelect] = useState(false);
    const [modal,setModal] = useState(false);


  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress=(event)=>{
      if(event.key==='/'){
        setSelect(((prev)=>!prev));  
      }
    }

    document.addEventListener('keypress',keypress)
    return()=>{
      document.removeEventListener('keypress',keypress)
    }

  }, []);


  function handleSelect(value){
    console.log(value);
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
      open={select}
        style={{ width: 250 }}
        onSelect={handleSelect}
        onClick={()=>setSelect((prev)=>!prev)}
        placeholder="Press to open"
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
