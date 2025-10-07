import { Layout, Select, Space, Button,Modal,Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { use } from "react";
import { useState,useEffect } from "react";
import CoinInfoModal from "../CoininfoModal";
import AddAssetForm from "../AddAssetForm";

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
    const[coin,setCoin]=useState(null);
    const[drawer,setDrawer]=useState(true);

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
    setCoin(crypto.find((coin)=>coin.id===value));
    setModal(true);
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
      <Button type="primary" onClick={()=>setDrawer(true)}>Add Asset</Button>
      <Modal
        open={modal}
        onOk={()=>setModal(false)}
        onCancel={()=>setModal(false)}
        footer={null}
      >
    <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Add Asset"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={()=>setDrawer(false)}
        open={drawer}
        destroyOnClose
       
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
