import { Layout,Card,Statistic,List,Typography,Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect,useState } from 'react';
import { fetchAssets } from '../../api';
const siderStyle = {
  padding: '1rem',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

async function fakeFetchCryptoData() {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          result: [
            { name: "Bitcoin", price: 27000 },
            { name: "Ethereum", price: 1800 },
          ],
        }),
      1000
    )
  );
}


export default function AppSider() {
const[loading,setLoading]=useState(false)
const[crypto,setCrypto]=useState([])
const[assets,setAssets]=useState([])

  useEffect(()=>{

    async function preload(){
      setLoading(true)
   const {result} =await fakeFetchCryptoData()
   const assets = await fetchAssets()
   setAssets(assets)
   setCrypto(result)
   setLoading(false)
    }
    preload()
  },[])

    if(loading){
      return <Spin  fullscreen />
     
    }
    return(<Layout.Sider width="25%" style={siderStyle}>
      <Card style={{marginBottom:'1rem'}}>
     <Statistic
     title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
     />
     </Card>
     <List
      size="small"
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
    
     <Card>
     <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
        </Card>
      </Layout.Sider>)
}